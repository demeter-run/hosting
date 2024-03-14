import { json, type MetaFunction } from '@remix-run/node';
// import { useState } from 'react';
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

const DATA = [
    '2024-03-14T13:54:42.338827319Z HEAD /backups/directory.zip 404 - - 1.080 ms\n',
    '2024-03-14T13:55:40.707799067Z HEAD /backups/www.rar 404 - - 1.142 ms\n',
    '2024-03-14T13:56:12.242978036Z HEAD /old/config.js 404 - - 2.140 ms\n',
    '2024-03-14T14:01:13.159746374Z HEAD /back/directory.zip 404 - - 2.852 ms\n',
    '2024-03-14T14:05:28.585610352Z HEAD /restore/.env 404 - - 1.762 ms\n',
    '2024-03-14T14:06:26.362239326Z GET /robots.txt 404 - - 1.105 ms\n',
    '2024-03-14T14:08:59.375340025Z HEAD /back/public_html.zip 404 - - 1.256 ms\n',
    '2024-03-14T14:13:01.289019831Z HEAD /restore/bak.rar 404 - - 1.213 ms\n',
    '2024-03-14T14:13:14.321920362Z HEAD /restore/Archive.zip 404 - - 2.287 ms\n',
    'HEAD /backup/backup.gz 404 - - 2.305 ms\n',
    '2024-03-14T14:15:01.709886876Z HEAD /back/index.zip 404 - - 1.080 ms\n',
    '2024-03-14T14:22:21.996883172Z HEAD /backup/public_html.tar.gz 404 - - 1.710 ms\n',
    '2024-03-14T14:35:07.240209363Z HEAD /backups/txpipe.io.zip 404 - - 1.100 ms\n',
];

export default function Logs() {
    // const { logs } = useLoaderData<typeof loader>();
    // const [wrap, setWrap] = useState(false);
    const wrap = false;

    const output = DATA.map(log => log.replace(/ /g, '&nbsp').replace(/\n/g, '<br />')).join('');

    return (
        <>
            <h1 className="title-3xl">Logs</h1>

            <div
                className={`bg-gray-950 mt-4 p-4 rounded-md h-[calc(100vh-240px)] font-mono text-sm overflow-x-auto text-gray-400 ${
                    wrap ? 'whitespace-normal' : 'whitespace-nowrap'
                } `}
                dangerouslySetInnerHTML={{ __html: output || 'loading' }}
            ></div>
        </>
    );
}
