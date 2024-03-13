import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDate, formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getCosts } from '~/server/cost.server';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';

export const meta: MetaFunction = () => {
    return [{ title: 'Cost - Demeter Hosting' }, { name: 'description', content: 'Cost - Demeter Hosting' }];
};

export async function loader() {
    const costs = getCosts();

    invariant(costs, 'Failed to load costs data');

    return json({ costs });
}

export default function Cost() {
    const { costs } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Costs</h1>

            <div className="flex flex-col lg:flex-row gap-8 mt-4">
                <div className="content-wrapper p-4">
                    <div className="font-mono font-semibold mb-4">Requests</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={costs} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Line type="linear" dataKey="requests" stroke="#4f46e5" />
                            <CartesianGrid stroke="#e6e6e6" strokeDasharray="5 5" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={value => formatDate(new Date(value), 'short')}
                                tickMargin={10}
                                tickSize={3}
                                tick={{ fontSize: 14 }}
                            />
                            <YAxis
                                width={50}
                                tickFormatter={value => value.toLocaleString('en-US', { notation: 'compact' })}
                                tickSize={3}
                                tickMargin={10}
                                tick={{ fontSize: 14 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="content-wrapper p-4">
                <div className="font-mono font-semibold mb-4">DCUS</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={costs} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Line type="linear" dataKey="dcus" stroke="#4f46e5" />
                            <CartesianGrid stroke="#e6e6e6" strokeDasharray="5 5" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={value => formatDate(new Date(value), 'short')}
                                tickMargin={10}
                                tickSize={3}
                                tick={{ fontSize: 14 }}
                            />
                            <YAxis
                                width={50}
                                tickFormatter={value => value.toLocaleString('en-US', { notation: 'compact' })}
                                tickSize={3}
                                tickMargin={10}
                                tick={{ fontSize: 14 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="content-wrapper mt-8 overflow-x-auto">
                <table className="table-wrapper">
                    <thead>
                        <tr>
                            <th className="table-th">Time</th>
                            <th className="table-th text-right">Requests nr</th>
                            <th className="table-th text-right">Dcus</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {costs.map(c => (
                            <tr key={c.id} className="table-tr">
                                <td className="table-td">{formatDateClient(new Date(c.timestamp), 'medium', 'short')}</td>
                                <td className="table-td text-right">{c.requests.toLocaleString('en-US')}</td>
                                <td className="table-td text-right">{c.dcus.toLocaleString('en-US')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
