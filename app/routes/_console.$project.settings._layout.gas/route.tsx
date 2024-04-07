import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getBalance, getLedger } from '~/server/gas.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Gas - Demeter Hosting' }, { name: 'description', content: 'Gas - Demeter Hosting' }];
};

export async function loader() {
    const ledger = await getLedger();
    invariant(ledger, 'Failed to load ledger data');

    const balance = await getBalance();
    invariant(balance, 'Failed to load balance data');

    return json({ ledger, balance });
}

export default function Gas() {
    const { ledger, balance } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Gas</h1>
            <div className="content-wrapper mt-4 p-6">
                <div className="flex items-end">
                    <div className="">
                        <div className="label-1">Balance</div>
                        <div className="flex sm:items-center gap-4 sm:gap-8 flex-col sm:flex-row">
                            <div className="flex items-end">
                                <div className="text-4xl">{balance.toLocaleString('en-US')}</div>
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
                            <th className="table-th">From</th>
                            <th className="table-th">To</th>
                            <th className="table-th">Provider</th>
                            <th className="table-th text-right">Requests</th>
                            <th className="table-th text-right">Dcus</th>
                            <th className="table-th text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {ledger.map(l => (
                            <tr key={l.id} className="table-tr">
                                <td className="table-td">{formatDateClient(new Date(l.from), 'short', 'short')}</td>
                                <td className="table-td">{formatDateClient(new Date(l.to), 'short', 'short')}</td>
                                <td className="table-td">{l.provider}</td>
                                <td className="table-td text-right">{l.requests.toLocaleString('en-US')}</td>
                                <td className="table-td text-right">{l.dcus.toLocaleString('en-US')}</td>
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
