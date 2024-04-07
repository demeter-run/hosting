import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Build } from '~/server/builds.server';
import { BranchIcon, CommitIcon } from '~/fragments/icons';
import { Project } from '~/server/project.server';
import { formatDateClient } from '~/helpers/date';
import { Form } from '@remix-run/react';

type ModalSelectProjectProps = {
    isConfirmRestoreOpen: boolean;
    setIsConfirmRestoreOpen: React.Dispatch<React.SetStateAction<boolean>>;
    restoreBuild: Build | null;
    projectData: Project | null;
};

export default function ModalConfirmRestore(props: ModalSelectProjectProps) {
    const { isConfirmRestoreOpen, setIsConfirmRestoreOpen, restoreBuild: build, projectData } = props;

    return (
        <>
            <Transition appear show={isConfirmRestoreOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsConfirmRestoreOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white px-4 py-10 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h2" className="title-2xl ml-4">
                                        Restore build #{build?.id}
                                    </Dialog.Title>
                                    <div className="px-4 mt-4">
                                        {/* <p className="text-base">You are about to restore build #{build?.id}</p> */}

                                        <div className="flex items-center mt-4">
                                            <BranchIcon className="w-4 mr-2" />
                                            <div className="text-sm font-mono" title="Branch">
                                                {build?.branch}
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <CommitIcon className="w-4 mr-2" />
                                            <div className="flex items-center text-sm">
                                                <a
                                                    href={`https://github.com/${projectData?.github.org}/${projectData?.github.project}/commit/${build?.commitFullSha}`}
                                                    className="font-mono mr-2 link-text"
                                                    title="Commit"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {build?.commit}
                                                </a>
                                                <div className="line-clamp-1" title="Commit message">
                                                    {build?.message}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-nowrap mt-4">
                                            {build && formatDateClient(new Date(build.timestamp), 'medium', 'short')} by {build?.author}
                                        </div>
                                        <Form method="post">
                                            <input type="hidden" name="buildId" value={build?.id} />
                                            <button className="btn-primary mt-8" type="submit" onClick={() => setIsConfirmRestoreOpen(false)}>
                                                Restore
                                            </button>
                                        </Form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
