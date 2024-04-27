import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getWalletAddress, getWalletBalance, useConnectWallet, WalletModal } from '@newm.io/cardano-dapp-wallet-connector';
import { CheckCircleIcon, LogoHover, SpinnerIcon, XCircleIcon } from '~/fragments/icons';
import { Link, json, useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import WalletNotFound from '~/fragments/wallet-not-found';
import { getPageData, handlePageAction } from '~/server/mint.server';
import invariant from '~/helpers/invariant';
import Footer from '~/fragments/footer';

export const meta: MetaFunction = () => {
    return [{ title: 'Mint namespace - Demeter Hosting' }, { name: 'description', content: 'Mint namespace - Demeter Hosting' }];
};

export async function loader({ request }: { request: Request }) {
    // Check for a tx sash in the URL
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const txHash = searchParams.get('hash');
    // If no hash in the URL, return null
    if (!txHash) return json({ pageData: { txHash: null, txStatus: null } });
    // If there is a tx hash in the URL, get the transaction status
    const pageData = await getPageData(txHash);
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const result = await handlePageAction(data);
    return json(result);
}

export default function MintNamespace() {
    const { wallet, getAddress } = useConnectWallet();
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const txStatusInterval = useRef<NodeJS.Timeout | null>(null);
    const [step, setStep] = useState<'search' | 'mint' | 'submitting' | 'pending' | 'fail' | 'expired' | 'confirmed'>('search');
    const [availability, setAvailability] = useState<'idle' | 'searching' | 'available' | 'unavailable'>('idle');
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [namespace, setNamespace] = useState('');
    const [txCbor, setTxCbor] = useState('');
    const fetcherRunning = useMemo(() => fetcher.state === 'loading' || fetcher.state === 'submitting', [fetcher.state]);
    const { pageData: pd } = useLoaderData<typeof loader>();

    // Fetches wallet data on wallet connection
    useEffect(() => {
        async function fetchData() {
            if (wallet) {
                const [balance, address] = await Promise.all([getWalletBalance(wallet), getWalletAddress(wallet)]);
                setWalletBalance(balance);
                setWalletAddress(address);
            }
        }
        fetchData();
    }, [getAddress, wallet, walletAddress]);

    // Listens for server side responses from fetcher and updates state accordingly
    useEffect(() => {
        if (fetcher.data) {
            let responseTxStatus: 'pending' | 'confirmed' | 'expired';
            switch ((fetcher.data as { intent: string }).intent) {
                // Handles state update for namespace availability check, triggered by namespace input change
                case 'check_availability':
                    setAvailability((fetcher.data as { isAvailable: boolean }).isAvailable ? 'available' : 'unavailable');
                    break;
                // Handles state update for transaction cbor fetch, sets cbor and moves to mint step, triggered byt Review Details button
                case 'get_cbor':
                    setTxCbor((fetcher.data as { cbor: string }).cbor);
                    setStep('mint');
                    break;
                case 'get_tx_status':
                    responseTxStatus = (fetcher.data as { txStatus: 'pending' | 'confirmed' | 'expired' }).txStatus;
                    // console.log('fetcher response inside', responseTxStatus);
                    setStep(responseTxStatus);
                    if (responseTxStatus === 'confirmed' || responseTxStatus === 'expired') {
                        // console.log('Tx status confirmed or expired clearing interval');
                        clearInterval(txStatusInterval.current as NodeJS.Timeout);
                    }
                    break;
            }
        }
    }, [fetcher.data]);

    // Listens to transactions hash in the URL and sets status, trigger polling if pending
    useEffect(() => {
        if (pd.txStatus) {
            // console.log('Tx status effect');
            setStep(pd.txStatus);
            if (pd.txStatus === 'pending') {
                // console.log('Tx inside pending');
                clearInterval(txStatusInterval.current as NodeJS.Timeout);
                txStatusInterval.current = setInterval(async () => {
                    // console.log('Tx status interval');
                    fetcher.submit({ intent: 'get_tx_status', hash: pd.txHash }, { method: 'POST' });
                }, 5000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pd.txHash]);

    // Handles namespace input change and triggers server side search for availability
    const handleNamespaceInputChange = (e: { target: { value: string } }) => {
        searchTimeout.current && clearTimeout(searchTimeout.current);
        const newNamespace: string = e.target.value;
        setNamespace(newNamespace);
        if (newNamespace.length === 0) {
            return setAvailability('idle');
        } else {
            setAvailability('searching');
            searchTimeout.current = setTimeout(async () => {
                fetcher.submit({ intent: 'check_availability', namespace: newNamespace }, { method: 'POST' });
            }, 1000);
        }
        return () => searchTimeout.current && clearTimeout(searchTimeout.current);
    };

    // Handles review details button click, triggers server side request for transaction cbor
    const handleReviewDetails = () => {
        fetcher.submit({ intent: 'get_cbor', namespace: namespace, address: walletAddress }, { method: 'POST' });
    };

    const handleBackToSearch = () => {
        setTxCbor('');
        setNamespace('');
        setAvailability('idle');
        setStep('search');
    };

    // Handles mint confirmation, triggers tx signing and submission, navigates to transactions status page
    const handleMintNamespace = async () => {
        setStep('submitting');
        let signedTx: string;
        let txHash: string;
        // Sign transaction with wallet
        try {
            signedTx = await wallet?.signTx(txCbor);
        } catch (error) {
            console.error('Error signing transaction:', error);
            setStep('fail');
            return;
        }
        console.log('Signed transaction:', signedTx);
        // Send signed transaction to the network
        try {
            txHash = await wallet?.submitTx(signedTx);
        } catch (error) {
            console.error('Error submitting transaction:', error);
            setStep('fail');
            return;
        }
        console.log('Transaction hash:', txHash);
        // navigate(`/mint-namespace?hash=53c44b2f2a8622fbcbf3a8e44cf7479e9cb4e17f5d223b79a7c4ec9cf8c9ffbb`);
        navigate(`/mint-namespace?hash=${txHash}`);
    };

    // If wallets is not connected prevents page rendering and shows a wallet not found message with CTA for connecting wallet
    if (!wallet) {
        return (
            <div className="wrapper h-screen">
                <WalletNotFound />
            </div>
        );
    }

    return (
        <>
            <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />

            {/* Navbar */}
            <header className="h-20 w-full fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-50">
                <div className="wrapper h-full flex justify-between items-center">
                    <Link className="flex items-center group" to="/">
                        <LogoHover className="w-20 md:w-36" />
                    </Link>
                    <div>
                        {wallet && (
                            <div>
                                <button className="flex items-center text-right justify-end" onClick={() => setIsWalletModalOpen(true)}>
                                    <img className="w-8 mr-1" src={wallet.icon} alt={wallet.name} />
                                    <div className="font-bold capitalize text-xl">{wallet.name}</div>
                                </button>
                                <div className="text-green1 text-xs uppercase font-mono font-semibold text-right">Connected</div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="bg-[#fafafa] dark:bg-gray-950 border-t border-b border-gray-50 dark:border-gray-600">
                <div className="wrapper min-h-[calc(100vh-82px)] pt-32 pb-12">
                    <div className="max-w-5xl mx-auto">
                        {/* Search */}
                        {step === 'search' && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Search for your namespace</h2>
                                    <input
                                        className="form-input mt-4"
                                        type="search"
                                        value={namespace}
                                        onChange={handleNamespaceInputChange}
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
                                    <button
                                        className="btn-primary flex-none"
                                        onClick={() => handleReviewDetails()}
                                        disabled={availability !== 'available' || fetcherRunning}
                                    >
                                        Review details
                                    </button>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">What is my namespace?</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        The namespace represents your unique URL on the Demeter network. It is used to identify your frontend
                                        application.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Mint */}
                        {(step === 'mint' || step === 'submitting') && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Review details</h2>

                                    <p className="mt-4 text-sm">
                                        Please verify the information below. By continuing, you agree to deduct the transaction cost from your
                                        connected wallet.
                                    </p>
                                    <div className="mt-5">
                                        <div className="label-1">Namespace</div>
                                        <div className="text-lg font-medium">
                                            <span className="text-accent1">{namespace}</span>
                                            <span>.demeter.hosting</span>
                                        </div>
                                    </div>

                                    <div className="flex mt-4 gap-8">
                                        <div>
                                            <div className="label-1">Wallet</div>
                                            <div className="flex items-center">
                                                <img className="w-5 mr-1" src={wallet?.icon} alt={wallet?.name} />
                                                <div className="capitalize text-lg font-medium">{wallet?.name}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="label-1">Balance</div>
                                            <div className="text-lg font-medium">₳{walletBalance}</div>
                                        </div>
                                        <div>
                                            <div className="label-1">Price</div>
                                            <div className="text-lg font-medium">₳50</div>
                                        </div>
                                    </div>

                                    <div className="flex-1"></div>
                                    <div className="flex gap-4">
                                        <button className="btn-primary flex-none" onClick={handleMintNamespace} disabled={step === 'submitting'}>
                                            Confirm
                                        </button>
                                        <button className="btn-secondary flex-none" onClick={handleBackToSearch} disabled={step === 'submitting'}>
                                            Back
                                        </button>
                                        {step === 'submitting' && (
                                            <div className="flex items-center gap-2">
                                                <SpinnerIcon className="w-5 animate-spin text-accent1" />
                                                <div className="text-sm">Submitting</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">Minting your namespace</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        By minting your namespace, you are securing your unique URL on the Demeter network. This will allow you to
                                        deploy your frontend application to the network..
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Pending */}
                        {step === 'pending' && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Transaction submitted</h2>
                                    <div className="label-1 mt-4">Transaction hash</div>
                                    <div className="text-sm break-words mt-1">{pd.txHash}</div>
                                    <div className="mt-4 flex-1 flex flex-col items-center justify-center border border-gray-100 bg-gray-50 rounded-md">
                                        <SpinnerIcon className="w-16 animate-spin mx-auto text-accent1" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">Verifying transaction</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus nec odio ultricies.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Fail */}
                        {step === 'fail' && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Transaction failed</h2>
                                    <div className="label-1 mt-4">Transaction hash</div>
                                    <div className="text-sm break-words mt-1">{pd.txHash}</div>
                                    <div className="mt-4 flex-1 flex flex-col items-center justify-center border border-gray-100 bg-gray-50 rounded-md">
                                        <XCircleIcon className="w-20 text-red1 mx-auto" />
                                    </div>
                                    <button className="btn-primary mt-8" onClick={handleBackToSearch}>
                                        Try again
                                    </button>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">There was an error processing your transaction</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus nec odio ultricies.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Expired */}
                        {step === 'expired' && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Transaction expired</h2>
                                    <div className="label-1 mt-4">Transaction hash</div>
                                    <div className="text-sm break-words mt-1">{pd.txHash}</div>
                                    <div className="mt-4 flex-1 flex flex-col items-center justify-center border border-gray-100 bg-gray-50 rounded-md">
                                        <XCircleIcon className="w-20 text-red1 mx-auto" />
                                    </div>
                                    <button className="btn-primary mt-8" onClick={handleBackToSearch}>
                                        Try again
                                    </button>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">Transaction exceeded max time</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus nec odio ultricies.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Confirmed */}
                        {step === 'confirmed' && (
                            <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                                <div className="content-wrapper p-6 h-96 flex flex-col">
                                    <h2 className="title-2xl">Transaction confirmed</h2>
                                    <div className="label-1 mt-4">Transaction hash</div>
                                    <div className="text-sm break-words mt-1">
                                        {pd.txHash}53c44b2f2a8622fbcbf3a8e44cf7479e9cb4e17f5d223b79a7c4ec9cf8c9ffbb
                                    </div>
                                    <div className="mt-4 flex-1 flex flex-col items-center justify-center border border-gray-100 bg-gray-50 rounded-md">
                                        <CheckCircleIcon className="w-20 text-green1 mx-auto" />
                                    </div>
                                    <button className="btn-primary mt-8" onClick={handleBackToSearch}>
                                        Try again
                                    </button>
                                </div>
                                <div>
                                    <h3 className="title-2xl mt-6">Congratulations! Your namespace is minted.</h3>
                                    <p className="mt-4 text-normal text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus nec odio ultricies.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
