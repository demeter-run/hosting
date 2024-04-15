import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BranchIcon, CommitIcon } from '~/fragments/icons';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getPageData, handlePageAction } from '~/server/builds.server';
import ModalConfirmRestore from './modal-confirm-restore';
import { useState } from 'react';
import { Build } from '~/helpers/types';

export const meta: MetaFunction = () => {
    return [{ title: 'Builds - Demeter Hosting' }, { name: 'description', content: 'Builds - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const result = await handlePageAction(data);
    return json(result);
}

export default function Builds() {
    const { pageData: pd } = useLoaderData<typeof loader>();
    const [isConfirmRestoreOpen, setIsConfirmRestoreOpen] = useState(false);
    const [restoreBuild, setRestoreBuild] = useState<Build | null>(null);

    function handleRestore(buildId: number) {
        setRestoreBuild(pd.builds.find(b => b.id === buildId) || null);
        setIsConfirmRestoreOpen(true);
    }

    return (
        <>
            <ModalConfirmRestore
                isConfirmRestoreOpen={isConfirmRestoreOpen}
                setIsConfirmRestoreOpen={setIsConfirmRestoreOpen}
                restoreBuild={restoreBuild}
                pd={pd}
            />
            <h1 className="title-3xl">Builds</h1>
            <div className="content-wrapper mt-4">
                {pd.builds.length ? (
                    pd.builds.map(b => (
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
                                                href={`https://github.com/${pd.github.organization}/${pd.github.repository}/commit/${b.commitFullSha}`}
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
                                        <button className="btn-secondary-mini" type="button" onClick={() => handleRestore(b.id)}>
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
