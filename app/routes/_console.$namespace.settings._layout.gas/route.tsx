import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData, useRevalidator } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '~/fragments/icons';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getPageData, handlePageAction } from '~/server/gas.server';
import ModalTopUp from './modal-top-up';
import { useConnectWallet } from '@newm.io/cardano-dapp-wallet-connector';

export const meta: MetaFunction = () => {
    return [{ title: 'Gas - Demeter Hosting' }, { name: 'description', content: 'Gas - Demeter Hosting' }];
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

export default function Gas() {
    const { pageData: pd } = useLoaderData<typeof loader>();
    const { wallet } = useConnectWallet();
    const fetcher = useFetcher();
    const revalidator = useRevalidator();
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    // Listens for server side responses from fetcher and updates state accordingly
    useEffect(() => {
        async function fetchData() {
            if (fetcher.data) {
                switch ((fetcher.data as { intent: string }).intent) {
                    // Handles dcus top wallet up confirmation, triggers tx signing and submission
                    case 'top_up_dcus': {
                        const txCbor = (fetcher.data as { cbor: string }).cbor;
                        console.log(txCbor);
                        let signedTx: string;
                        let txHash: string;
                        // Sign transaction with wallet
                        try {
                            signedTx = await wallet?.signTx(txCbor);
                        } catch (error) {
                            console.error('Error signing transaction:', error);
                            return;
                        }
                        console.log('Signed transaction:', signedTx);
                        // Send signed transaction to the network
                        try {
                            txHash = await wallet?.submitTx(signedTx);
                        } catch (error) {
                            console.error('Error submitting transaction:', error);
                            return;
                        }
                        console.log('Transaction hash:', txHash);
                        revalidator.revalidate();
                        break;
                    }
                }
            }
        }
        fetchData();
    }, [fetcher.data, revalidator, wallet]);

    function handleTopUp(dcus: number) {
        setIsTopUpOpen(false);
        fetcher.submit({ intent: 'top_up_dcus', dcus, address: pd.address }, { method: 'POST' });
    }

    return (
        <>
            <ModalTopUp isTopUpOpen={isTopUpOpen} setIsTopUpOpen={setIsTopUpOpen} handleTopUp={handleTopUp} />
            <h1 className="title-3xl">Gas</h1>
            <div className="content-wrapper mt-4 p-6">
                <div className="flex items-end">
                    <div className="">
                        <div className="label-1">Balance</div>
                        <div className="flex sm:items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                            <div className="flex items-end">
                                <div className="text-4xl">{pd.balance.toLocaleString('en-US')}</div>
                                <div className="font-semibold text-sm ml-1 mb-[2px]">DCUS</div>
                            </div>
                            <button className="btn-primary-mini" onClick={() => setIsTopUpOpen(true)}>
                                Top up dcus
                            </button>
                        </div>
                    </div>
                </div>

                <div className="label-1 mt-4">Namespace address</div>
                <div className="text-sm mt-[2px] break-words">{pd.address}</div>
            </div>

            <div className="content-wrapper mt-8 overflow-x-auto">
                <table className="table-wrapper">
                    <thead>
                        <tr>
                            <th className="table-th"></th>
                            <th className="table-th">Time</th>
                            <th className="table-th">Type</th>
                            <th className="table-th text-right">Dcus</th>
                            <th className="table-th text-right">Requests</th>
                            <th className="table-th">Provider</th>
                            <th className="table-th text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {pd.gasLedger.map(l => (
                            <tr key={l.id} className="table-tr">
                                <td className="table-td">
                                    {l.type === 'topup' ? (
                                        <ArrowLongRightIcon className="w-6 text-green-500" />
                                    ) : (
                                        <ArrowLongLeftIcon className="w-6 text-red-500" />
                                    )}
                                </td>
                                <td className="table-td">{formatDateClient(new Date(l.timestamp), 'short', 'short')}</td>
                                <td className="table-td">{TRANSACTION_TYPES[l.type]}</td>
                                <td className="table-td text-right">{l.dcus.toLocaleString('en-US')}</td>
                                <td className="table-td text-right">{l.requests && l.requests.toLocaleString('en-US')}</td>
                                <td className="table-td">{l.provider && l.provider}</td>
                                <td className="table-td text-right">
                                    <a
                                        href={`https://beta.explorer.cardano.org/en/transaction/${l.hash}`}
                                        className="btn-secondary-mini text-nowrap inline-flex"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        See transaction
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const TRANSACTION_TYPES: { [key: string]: string } = {
    topup: 'Top up DCUs',
    charge: 'Usage charge',
};
