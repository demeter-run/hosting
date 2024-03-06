import { json, type MetaFunction } from '@remix-run/node';
// import { useLoaderData } from '@remix-run/react';
import invariant from '~/helpers/invariant';
import { getLogs } from '~/server/logs.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Logs - Demeter Hosting' }, { name: 'description', content: 'Logs - Demeter Hosting' }];
};

export async function loader() {
    const logs = getLogs();

    invariant(logs, 'Failed to load logs data');

    return json({ logs });
}

export default function Logs() {
    // const { logs } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Logs</h1>
        </>
    );
}
