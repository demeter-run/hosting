import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from '@remix-run/react';
import { CheckCircleIcon, SpinnerIcon, XCircleIcon } from '~/fragments/icons';
import { EnabledWallet } from '@newm.io/cardano-dapp-wallet-connector';

type ModalMintProps = {
    isMintModalOpen: boolean;
    setIsMintModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    wallet?: EnabledWallet | null;
    walletBalance?: number;
};

export default function ModalMint(props: ModalMintProps) {
    const { isMintModalOpen, setIsMintModalOpen, wallet, walletBalance } = props;
    const [step, setStep] = useState<'search' | 'mint' | 'submitting' | 'fail' | 'success'>('search');
    const [availability, setAvailability] = useState<'idle' | 'searching' | 'available' | 'unavailable'>('idle');
    const [namespace, setNamespace] = useState('');
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: { target: { value: string } }) => {
        searchTimeout.current && clearTimeout(searchTimeout.current);
        const newNamespace: string = e.target.value;
        setNamespace(newNamespace);
        if (newNamespace.length === 0) {
            return setAvailability('idle');
        } else {
            setAvailability('searching');
            searchTimeout.current = setTimeout(async () => {
                const isAvailable = await checkAvailability(newNamespace);
                setAvailability(isAvailable ? 'available' : 'unavailable');
            }, 1000);
        }
        return () => searchTimeout.current && clearTimeout(searchTimeout.current);
    };

    return (
        <>
            <Transition appear show={isMintModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsMintModalOpen(false)}>
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
                                <Dialog.Panel className="w-full h-[420px] max-w-md transform overflow-hidden rounded-2xl bg-white px-8 py-10 text-left align-middle shadow-xl transition-all">
                                    {step === 'search' && (
                                        <div className="flex flex-col h-full">
                                            <Dialog.Title as="h2" className="text-xl font-medium">
                                                Secure your namespace
                                            </Dialog.Title>
                                            <input
                                                className="form-input mt-4"
                                                type="search"
                                                value={namespace}
                                                onChange={handleChange}
                                                placeholder="namespace"
                                                name="namespace"
                                            />
                                            <div className="mt-4 label-1">Your unique URL</div>
                                            <div className="text-lg font-medium">
                                                {namespace.length > 0 ? (
                                                    <span className="text-accent1">{namespace}</span>
                                                ) : (
                                                    <span className="">namespace</span>
                                                )}
                                                <span>.demeter.hosting</span>
                                            </div>
                                            <div className="mt-2 flex-1">
                                                {availability === 'searching' && (
                                                    <div className="flex items-center text-accent1">
                                                        <div className="w-8 flex-none">
                                                            <SpinnerIcon className="w-5 animate-spin" />
                                                        </div>
                                                        <div className="">Searching</div>
                                                    </div>
                                                )}
                                                {availability === 'available' && (
                                                    <div className="flex items-center">
                                                        <div className="w-8 flex-none">
                                                            <CheckCircleIcon className="w-6 text-green1" />
                                                        </div>
                                                        <div className="text-green1">Available</div>
                                                        <div className="text-lg font-medium ml-2">₳50</div>
                                                    </div>
                                                )}
                                                {availability === 'unavailable' && (
                                                    <div className="flex items-center text-red1">
                                                        <div className="w-8 flex-none">
                                                            <XCircleIcon className="w-6" />
                                                        </div>
                                                        <div className="">Not available</div>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="btn-primary" onClick={() => setStep('mint')} disabled={availability !== 'available'}>
                                                Buy namespace
                                            </button>
                                        </div>
                                    )}
                                    {step === 'mint' && (
                                        <div className="flex flex-col h-full">
                                            <Dialog.Title as="h2" className="text-xl font-medium">
                                                Confirm your transaction
                                            </Dialog.Title>

                                            <div className="mt-4 text-normal text-gray-600">
                                                Please verify the information below. By continuing, you agree to deduct the transaction cost from your
                                                connected wallet.
                                            </div>

                                            <div className="grid grid-cols-2 mt-5 gap-8">
                                                <div>
                                                    <div className="label-1">Namespace</div>
                                                    <div className="text-lg font-medium">
                                                        <span className="text-accent1">{namespace}</span>
                                                        <span>.demeter.hosting</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="label-1">Price</div>
                                                    <div className="text-lg font-medium">₳50</div>
                                                </div>
                                                <div>
                                                    <div className="label-1">Connected wallet</div>
                                                    <div className="flex items-center">
                                                        <img className="w-5 mr-1" src={wallet?.icon} alt={wallet?.name} />
                                                        <div className="capitalize text-lg font-medium">{wallet?.name}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="label-1">Wallet balance</div>
                                                    <div className="text-lg font-medium">₳{walletBalance}</div>
                                                </div>
                                            </div>

                                            <div className="flex-1"></div>
                                            <button className="btn-primary mt-8" onClick={() => setStep('submitting')}>
                                                Mint namespace
                                            </button>
                                        </div>
                                    )}
                                    {step === 'submitting' && (
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1 flex items-center justify center">
                                                <div className="text-center">
                                                    <SpinnerIcon className="w-12 animate-spin mx-auto text-accent1" />
                                                    <div className="text-center text-lg mt-6 font-medium text-balance">
                                                        Please wait while your transaction is being verified.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button className="btn-primary mt-8" onClick={() => setStep('success')}>
                                                    Success
                                                </button>
                                                <button className="btn-primary mt-8" onClick={() => setStep('fail')}>
                                                    Fail
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {step === 'fail' && (
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1 flex items-center justify center">
                                                <div className="">
                                                    <XCircleIcon className="w-14 text-red1 mx-auto" />
                                                    <div className="text-center text-lg mt-6 font-medium text-balance px-6">
                                                        There was a problem with your transaction, please check your balance and try again.
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-primary mt-8" onClick={() => setStep('mint')}>
                                                Try again
                                            </button>
                                        </div>
                                    )}
                                    {step === 'success' && (
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1 flex items-center justify center">
                                                <div className="">
                                                    <CheckCircleIcon className="w-16 text-green1 mx-auto" />
                                                    <div className="text-center text-lg mt-6 font-medium text-balance px-6">
                                                        Your transaction was successful! Your namespace is now secured.
                                                    </div>
                                                </div>
                                            </div>
                                            <Link className="btn-primary mt-8" to="/console">
                                                Go to console
                                            </Link>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

function checkAvailability(namespace: string): Promise<boolean> {
    console.log(namespace);
    const namespaces = ['demeter', 'apollo', 'zeus', 'hermes', 'athena', 'artemis', 'ares', 'dionysus', 'hades'];
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(!namespaces.includes(namespace));
        }, 1000);
    });
}
