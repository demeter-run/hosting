import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { useEventSource } from 'remix-utils/sse/react';
import { getPageData } from '~/server/logs.server';
import invariant from '~/helpers/invariant';
import { Log } from '~/helpers/types';

const LOGS_ARRAY_MAX_LENGTH = 5000;

export const meta: MetaFunction = () => {
    return [{ title: 'Logs - Demeter Hosting' }, { name: 'description', content: 'Logs - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export default function Logs() {
    const { pageData: pd } = useLoaderData<typeof loader>();
    const logsStream = useEventSource('/sse/logs', { event: 'log' });
    const [logsArray, setLogsArray] = useState<Log[]>(pd.logs || []);
    const [showTimestamp, setShowTimestamp] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [wrapText, setWrapText] = useState(false);
    const [autoscroll, setAutoscroll] = useState(true);
    const [zebra, setZebra] = useState(false);

    // React to streamer and adds new logs to the logs array
    useEffect(() => {
        if (!logsStream) return;
        const newLogs = JSON.parse(logsStream);
        setLogsArray((prev: Log[]) => {
            const newLogsArray = prev.concat(newLogs).slice(-LOGS_ARRAY_MAX_LENGTH);
            return newLogsArray;
        });
    }, [logsStream]);

    // Autoscrolls to the bottom of the log window when new logs are added if feature is enabled
    useEffect(() => {
        if (autoscroll) {
            const logDiv = document.querySelector('#log-window');
            logDiv?.scrollTo(0, logDiv.scrollHeight);
        }
    }, [autoscroll, logsArray]);

    // Parses logs array from state and writes output to be displayed
    const output = useMemo(() => {
        let zebraCount = 0;
        return logsArray
            .map(log => {
                const showAll = activeFilter === 'all';
                if (!showAll && log.provider !== activeFilter) {
                    return '';
                }
                let logsString = '';
                if (zebra) {
                    logsString = zebraCount % 2 ? '<div class="text-gray-100">' : '<div class="text-gray-500">';
                    zebraCount++;
                } else {
                    logsString = '<div class="text-gray-300">';
                }
                if (showTimestamp) logsString += log.timestamp + ' ';
                if (showAll) logsString += log.provider + ' ';
                logsString += log.msg;
                logsString += '</div>';
                return logsString;
            })
            .join('');
    }, [activeFilter, logsArray, showTimestamp, zebra]);

    return (
        <>
            <h1 className="title-3xl">Logs</h1>

            <div className="flex items-center gap-4 mt-4">
                <button className={`pill transition-all  ${activeFilter === 'all' && 'active'}`} onClick={() => setActiveFilter('all')}>
                    All
                </button>
                {pd.enabledProviders.map(p => (
                    <button
                        key={p.id}
                        className={`items-center gap-2 pill transition-all ${activeFilter === p.name && 'active'}`}
                        onClick={() => setActiveFilter(p.name)}
                    >
                        <img src={p.logo} alt={p.name} className="h-4" />
                        {p.name}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
                <button className={`mini-pill transition-all ${autoscroll ? 'active' : ''}`} onClick={() => setAutoscroll(!autoscroll)}>
                    Autoscroll
                </button>
                <button className={`mini-pill transition-all ${zebra ? 'active' : ''}`} onClick={() => setZebra(!zebra)}>
                    Zebra
                </button>
                <button className={`mini-pill transition-all ${wrapText ? 'active' : ''}`} onClick={() => setWrapText(!wrapText)}>
                    Wrap
                </button>
                <button className={`mini-pill transition-all ${showTimestamp ? 'active' : ''}`} onClick={() => setShowTimestamp(!showTimestamp)}>
                    Timestamps
                </button>
            </div>

            <div
                id="log-window"
                className={`bg-gray-950 mt-4 p-4 rounded-md h-[calc(100vh-300px)] font-mono text-sm overflow-x-auto ${
                    wrapText ? 'whitespace-normal' : 'whitespace-nowrap'
                } `}
                dangerouslySetInnerHTML={{ __html: output || 'loading' }}
            />
        </>
    );
}
