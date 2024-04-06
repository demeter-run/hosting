import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BranchIcon, CommitIcon } from '~/fragments/icons';
import { formatDateClient } from '~/helpers/date';
import { useProjectData } from '~/helpers/hooks';
import invariant from '~/helpers/invariant';
import { getBuilds } from '~/server/builds.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Builds - Demeter Hosting' }, { name: 'description', content: 'Builds - Demeter Hosting' }];
};

export async function loader() {
    const builds = await getBuilds();
    invariant(builds, 'Failed to load builds');

    return json({ builds });
}

export default function Builds() {
    const { builds } = useLoaderData<typeof loader>();
    const projectData = useProjectData();

    return (
        <>
            <h1 className="title-3xl">Builds</h1>
            <div className="content-wrapper mt-4">
                {builds.length ? (
                    builds.map(b => (
                        <div key={b.id} className="border-b border-gray-100 last:border-b-0 p-4 flex flex-col md:flex-row md:items-center gap-3">
                            <div className="flex w-full flex-col lg:flex-row lg:items-center gap-3">
                                <div className="lg:w-40" title="Build id">
                                    #{b.id}
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="flex items-center">
                                        <BranchIcon className="w-4 mr-2" />
                                        <div className="text-sm font-mono" title="Branch">
                                            {b.branch}
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <CommitIcon className="w-4 mr-2" />
                                        <div className="flex items-center text-sm">
                                            <a
                                                href={`https://github.com/${projectData?.github.org}/${projectData?.github.project}/commit/${b.commitFullSha}`}
                                                className="font-mono mr-2 link-text"
                                                title="Commit"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {b.commit}
                                            </a>
                                            <div className="line-clamp-1" title="Commit message">
                                                {b.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:ml-auto flex md:items-center flex-col md:flex-row gap-3">
                                <div className="text-sm md:text-right text-nowrap">
                                    {formatDateClient(new Date(b.timestamp), 'medium', 'short')} by {b.author}
                                </div>
                                <div className="w-36 flex md:justify-end">
                                    {b.current ? (
                                        <div className="tag-green">current</div>
                                    ) : (
                                        <button className="btn-secondary-mini" type="button">
                                            Restore
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 flex items-center justify-center text-gray-600">Your builds will appear here</div>
                )}
            </div>
        </>
    );
}
