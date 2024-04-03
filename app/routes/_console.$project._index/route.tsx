import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ClientOnly } from 'remix-utils/client-only';
import FRONTEND_TEMPLATES from '~/data/frontend-templates';
import { BranchIcon, CommitIcon } from '~/fragments/icons';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getProdBuild } from '~/server/builds.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Dashboard - Demeter Hosting' }, { name: 'description', content: 'Dashboard - Demeter Hosting' }];
};

export async function loader() {
    const prodBuild = await getProdBuild();

    invariant(prodBuild, 'Failed to load production build data.');

    return json({ prodBuild });
}

export default function Dashboard() {
    const { prodBuild } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Production build</h1>

            <div className="content-wrapper mt-4 px-4 py-6 flex flex-col md:flex-row gap-8">
                <div className="flex flex-col lg:flex-row flex-[2_2_0%] gap-8">
                    <div className="flex-1">
                        <img className="rounded-md" src={prodBuild.screenshot} alt="" />
                    </div>
                    <div className="flex-1">
                        <div className="tag-green">{prodBuild.status}</div>
                        <div className="label-1 mt-3">Providers</div>
                        <table className="mt-1">
                            <tbody>
                                {prodBuild.providers.map(provider => (
                                    <tr key={provider.id}>
                                        <td className="">
                                            <img className="w-5" src={provider.logo} alt={provider.name} />
                                        </td>
                                        <td className="text-sm px-2 py-1">{provider.name}</td>
                                        <td className="text-sm">{provider.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="label-1 mt-3">Active features</div>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {prodBuild.activeFeatures.map(feature => (
                                <div key={feature} className="tag-accent1">
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="label-1">Domains</div>
                    <div className="text-base">namespace.io namespace.demeter.host</div>

                    <div className="label-1 mt-3">Build id</div>
                    <div className="text-base">{prodBuild.id}</div>

                    <div className="label-1 mt-3">Created</div>
                    <div className="text-base">
                        {formatDateClient(new Date(prodBuild.timestamp), 'medium', 'short')} by {prodBuild.author}
                    </div>

                    <div className="label-1 mt-3">Source</div>
                    <div className="flex items-center mt-1">
                        <BranchIcon className="w-4 mr-2" />
                        <div className="text-sm font-mono" title="Branch">
                            {prodBuild.branch}
                        </div>
                    </div>
                    <div className="flex items-center mt-1">
                        <CommitIcon className="w-4 mr-2" />
                        <div className="flex items-center text-sm">
                            <div className="font-mono mr-2" title="Commit">
                                {prodBuild.commit}
                            </div>
                            <div className="line-clamp-1" title="Commit message">
                                {prodBuild.message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="title-3xl mt-8">Getting started</h1>
            <h1 className="title-xl mt-8">Configure Github action</h1>
            <ClientOnly>{() => <MyCodeComponent />}</ClientOnly>

            <h2 className="title-xl mt-8">Or get started with a template</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {FRONTEND_TEMPLATES.map(template => (
                    <div key={template.id} className="card-base">
                        <img className="h-12" src={template.logo} alt={template.name} />
                        <div className="text-2xl mt-4 font-semibold">{template.name}</div>
                        <div className="text-sm line-clamp-3 h-16 mt-1">{template.description}</div>
                        <button className="btn-secondary">Deploy</button>
                    </div>
                ))}
            </div>
        </>
    );
}

function MyCodeComponent() {
    return (
        <div className="border border-gray-50 rounded-lg mt-4 font-mono">
            <CopyBlock language="yaml" text={languageDemo} showLineNumbers={true} theme={dracula} codeBlock={true} />
        </div>
    );
}

const languageDemo = `name: Build Monolith
on:
  workflow_dispatch: {}

env:
  REGISTRY: 295114534192.dkr.ecr.us-west-2.amazonaws.com
  AWS_REGION: us-west-2

jobs:
  build_monolith_image:
    runs-on: ubuntu-20.04

    steps:
      - uses: actions/checkout@v2

      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-region: \${{ env.AWS_REGION }}
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          role-to-assume: arn:aws:iam::\${{ secrets.AWS_ACCOUNT_ID }}:role/ClusterAdminRole
          role-session-name: Github-Actions-Demeter
          role-duration-seconds: 1200

      - name: login to ECR
        uses: aws-actions/amazon-ecr-login@v1

      - name: setup docker
        uses: docker/setup-buildx-action@v1

      - name: build image
        uses: docker/build-push-action@v2
        with:
          context: ./
          push: true
          tags: \${{ env.REGISTRY }}/account-center:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
`;
