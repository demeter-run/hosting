import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from '@remix-run/react';
import { Namespace } from '~/helpers/types';

type ModalSelectProjectProps = {
    isSelectProjectOpen: boolean;
    setIsSelectProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
    namespaces: Namespace[];
};

export default function ModalSelectProject(props: ModalSelectProjectProps) {
    const { isSelectProjectOpen, setIsSelectProjectOpen } = props;

    return (
        <>
            <Transition appear show={isSelectProjectOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsSelectProjectOpen(false)}>
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
                                        Select namespace
                                    </Dialog.Title>
                                    <div className="mt-4 flex flex-col">
                                        {props.namespaces.map(n => (
                                            <Link key={n.name} className="rounded-md hover:bg-gray-100 px-4 py-3" to={`/${n.name}`}>
                                                {n.name}
                                            </Link>
                                        ))}
                                        <div className="px-4 mt-4">
                                            <div className="divider" />
                                        </div>
                                        <Link className="mt-4 rounded-md hover:bg-gray-100 px-4 py-3" to="/mint-namespace">
                                            Or mint new namespace
                                        </Link>
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
