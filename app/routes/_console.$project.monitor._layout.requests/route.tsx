import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getRequests } from '~/server/requests.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Requests - Demeter Hosting' }, { name: 'description', content: 'Requests - Demeter Hosting' }];
};

export async function loader() {
    const requests = getRequests();

    invariant(requests, 'Failed to load requests data');

    return json({ requests });
}

export default function Requests() {
    const { requests } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Requests</h1>
            <div className="content-wrapper mt-4 overflow-x-auto">
                <table className="table-wrapper">
                    <thead>
                        <tr>
                            <th className="table-th">Time</th>
                            <th className="table-th">Status</th>
                            <th className="table-th">Host</th>
                            <th className="table-th">Request</th>
                            <th className="table-th">Message</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {requests.map(r => (
                            <tr key={r.id} className="table-tr">
                                <td className="table-td">{formatDateClient(new Date(r.timestamp), 'medium', 'short')}</td>
                                <td className="table-td">{r.status}</td>
                                <td className="table-td">{r.host}</td>
                                <td className="table-td">{r.request}</td>
                                <td className="table-td">{r.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
