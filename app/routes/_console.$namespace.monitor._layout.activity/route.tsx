import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDate, formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getPageData } from '~/server/activity.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Cost - Demeter Hosting' }, { name: 'description', content: 'Cost - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export default function Activity() {
    const { pageData: pd } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Activity</h1>

            <div className="flex flex-col lg:flex-row gap-8 mt-4">
                <div className="content-wrapper p-4">
                    <div className="font-mono font-semibold mb-4">Requests</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={pd.activity} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
                        <LineChart data={pd.activity} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
                        {pd.activity.map(a => (
                            <tr key={a.id} className="table-tr">
                                <td className="table-td">{formatDateClient(new Date(a.timestamp), 'medium', 'short')}</td>
                                <td className="table-td text-right">{a.requests.toLocaleString('en-US')}</td>
                                <td className="table-td text-right">{a.dcus.toLocaleString('en-US')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
