import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { PageLoader } from '~/fragments/page-loader';
import { getLogs } from '~/server/logs.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Logs - Demeter Hosting' }, { name: 'description', content: 'Logs - Demeter Hosting' }];
};

export async function action({ request }: ActionFunctionArgs) {
    const logs = await getLogs();
    return json({ logs });
}

export default function Logs() {
    const fetcher = useFetcher();
    const [output, setOutput] = useState('');
    const wrap = false;
    const fetcherRunning = useMemo(() => fetcher.state === 'loading' || fetcher.state === 'submitting', [fetcher.state]);

    useEffect(() => {
        if (fetcher.data) {
            const newOutput = (fetcher.data as { logs: string[] }).logs
                .map((log: string) => log.replace(/ /g, '&nbsp').replace(/\n/g, '<br />'))
                .join('');
            setOutput((prev: string) => prev.concat(newOutput));
        }
    }, [fetcher.data]);

    function handleRefresh() {
        fetcher.submit({}, { method: 'POST' });
    }

    useEffect(() => {
        handleRefresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {fetcherRunning && <PageLoader />}
            <h1 className="title-3xl">Logs</h1>

            <div
                className={`bg-gray-950 mt-4 p-4 rounded-md h-[calc(100vh-300px)] font-mono text-sm overflow-x-auto text-gray-400 ${
                    wrap ? 'whitespace-normal' : 'whitespace-nowrap'
                } `}
                dangerouslySetInnerHTML={{ __html: output || 'loading' }}
            />
            <button className="btn-primary mt-4" onClick={handleRefresh}>
                Refresh
            </button>
        </>
    );
}
