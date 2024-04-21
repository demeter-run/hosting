import { LoaderFunctionArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils/sse/server';

export async function loader({ request }: LoaderFunctionArgs) {
    let streamInterval: NodeJS.Timeout;
    return eventStream(request.signal, function setup(send) {
        async function run() {
            streamInterval = setInterval(() => {
                const logs = getRandomLogs();
                send({ event: 'log', data: JSON.stringify(logs) });
            }, 1000);
        }
        run();
        return function cleanup() {
            clearInterval(streamInterval);
        };
    });
}

function getRandomLogs() {
    const logs = [LOGS1, LOGS2, LOGS3];
    const log = logs[Math.floor(Math.random() * logs.length)];
    const uniqueLogs = log.map(l => {
        return {
            timestamp: l.timestamp,
            msg: `${Math.random().toString(36).substr(2, 9)} ${l.msg}`,
            provider: l.provider,
        };
    });
    return uniqueLogs;
}

const LOGS1 = [
    {
        timestamp: '2024-03-14T13:55:40.707799067Z',
        msg: 'AAAAA HEAD /backups/www.rar 404 - - 1.142 ms',
        provider: 'Blink Labs',
    },
    {
        timestamp: '2024-03-14T13:56:12.242978036Z',
        msg: 'AAAA HEAD /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms',
        provider: 'TxPipe',
    },
    {
        timestamp: '2024-03-14T14:01:13.159746374Z',
        msg: 'AAAA 2024-03-14T14:01:13.159746374Z HEAD /back/directory.zip 404 - - 2.852 ms',
        provider: 'TxPipe',
    },
];

const LOGS2 = [
    {
        timestamp: '2024-03-14T13:55:40.707799067Z',
        msg: 'BBBB HEAD /backups/www.rar 404 - - 1.142 ms',
        provider: 'Blink Labs',
    },
    {
        timestamp: '2024-03-14T13:56:12.242978036Z',
        msg: 'BBBB HEAD /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms',
        provider: 'TxPipe',
    },
    {
        timestamp: '2024-03-14T14:01:13.159746374Z',
        msg: 'BBBB 2024-03-14T14:01:13.159746374Z HEAD /back/directory.zip 404 - - 2.852 ms',
        provider: 'TxPipe',
    },
];

const LOGS3 = [
    {
        timestamp: '2024-03-14T14:06:26.362239326Z',
        msg: 'CCCC 2024-03-14T14:06:26.362239326Z GET /robots.txt 404 - - 1.105 ms',
        provider: 'TxPipe',
    },
    {
        timestamp: '2024-03-14T14:08:59.375340025Z',
        msg: 'CCCC 2024-03-14T14:08:59.375340025Z HEAD /back/public_html.zip 404 - - 1.256 ms',
        provider: 'Blink Labs',
    },
    {
        timestamp: '2024-03-14T14:13:01.289019831Z',
        msg: 'CCCC HEAD /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms',
        provider: 'TxPipe',
    },
];
