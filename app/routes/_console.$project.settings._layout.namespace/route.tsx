import { type MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import { useProjectData } from '~/helpers/hooks';
export const meta: MetaFunction = () => {
    return [{ title: 'Namespaces - Demeter Hosting' }, { name: 'description', content: 'Namespaces - Demeter Hosting' }];
};

export default function Namespaces() {
    const projectData = useProjectData();

    return (
        <>
            <h1 className="title-3xl">Namespace</h1>

            <div className="content-wrapper mt-4 px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center w-full">
                    <div className="lg:w-3/4">
                        <div className="text-4xl font-semibold">{projectData?.namespace.name}</div>
                        <div className="label-1 mt-8">Minted</div>
                        <div className="">{formatDateClient(new Date(projectData!.namespace.timestamp), 'medium', 'short')}</div>
                        <div className="label-1 mt-4">Address</div>
                        <div className="break-words">{projectData?.namespace.address}</div>
                        <div className="label-1 mt-4">Policy id</div>
                        <div className="break-words">{projectData?.namespace.policyId}</div>
                    </div>
                    <a
                        href={`https://beta.explorer.cardano.org/en/transaction/${projectData?.namespace.hash}`}
                        className="btn-secondary-mini text-nowrap inline-flex flex-none"
                        target="_blank"
                        rel="noreferrer"
                    >
                        See transaction
                    </a>
                </div>
            </div>

            <h1 className="title-3xl mt-8">Aliases</h1>

            <div className="content-wrapper mt-4">
                {projectData?.aliases.length ? (
                    projectData.aliases.map(n => (
                        <div
                            key={n.name}
                            className="border-b border-gray-100 last:border-b-0 p-4 flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center"
                        >
                            <div className="w-3/4">
                                <div className="text-xl font-semibold">{n.name}</div>
                                <div className="label-1 mt-4">Minted</div>
                                <div className="">{formatDateClient(new Date(n.timestamp), 'medium', 'short')}</div>
                                <div className="label-1 mt-4">Address</div>
                                <div className="break-words">{n.address}</div>
                                <div className="label-1 mt-4">Policy id</div>
                                <div className="break-words">{n.policyId}</div>
                            </div>
                            <a
                                href={`https://beta.explorer.cardano.org/en/transaction/${n.hash}`}
                                className="btn-secondary-mini text-nowrap inline-flex"
                                target="_blank"
                                rel="noreferrer"
                            >
                                See transaction
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="p-6 flex items-center justify-center text-gray-600">Your aliases will show up here</div>
                )}
            </div>
            <Link className="btn-primary mt-8" to="/mint-namespace">
                Mint new alias
            </Link>
        </>
    );
}
