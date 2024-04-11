import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '~/fragments/icons';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getPageData } from '~/server/gas.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Gas - Demeter Hosting' }, { name: 'description', content: 'Gas - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData});
}

export default function Gas() {
    const { pageData: pd } = useLoaderData<typeof loader>();

    return (
        <>
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
                            <button className="btn-primary-mini">Top up dcus</button>
                        </div>
                    </div>
                </div>

                <div className="label-1 mt-4">Project address</div>
                <div className="text-sm mt-[2px] break-words">
                    addr1qxjtluvvk7xfjprjys3y08rhpd0ru8462543tydxvdyfr6uzwmsl2h24j0pa53yevcr0dgfrmv6svmf83guz4pzvxcc07ssn0szv
                </div>
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
