import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type ModalConfirmRestoreProps = {
    isTopUpOpen: boolean;
    setIsTopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleTopUp: (dcus: number) => void;
};

export default function ModalTopUp(props: ModalConfirmRestoreProps) {
    const { isTopUpOpen, setIsTopUpOpen, handleTopUp } = props;
    const [dcus, setDcus] = useState(1);

    useEffect(() => {
        setDcus(1);
    }, [isTopUpOpen]);

    return (
        <>
            <Transition appear show={isTopUpOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsTopUpOpen(false)}>
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
                                        Top up DCUS
                                    </Dialog.Title>
                                    <div className="px-4 mt-4">
                                        <input
                                            className="form-input"
                                            type="number"
                                            min={1}
                                            placeholder="Enter amount to top up"
                                            name="dcus"
                                            value={dcus}
                                            onChange={e => setDcus(Number(e.target.value))}
                                        />
                                        <button className="btn-primary mt-6" type="submit" onClick={() => handleTopUp(dcus)}>
                                            Top up
                                        </button>
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
