import type { LinksFunction } from '@remix-run/node';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
    },
];

export default function App() {
    return (
        <html lang="en" className="">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="antialiased">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <html lang="en" className="">
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <div className="h-screen w-full flex flex-col justify-center items-center">
                    <div className="max-w-lg mx-auto">
                        <img
                            src={`/assets/illus/not-found.webp`}
                            alt="Demeter devs searching for a page that went on an adventure"
                            className="rounded-full shadow-xl"
                        />
                    </div>
                    <h1 className="text-7xl font-semibold mt-12">Something went wrong</h1>
                    <p className="text-2xl mt-4 max-w-xl text-center font-light">
                        {isRouteErrorResponse(error) ? `${error.statusText}` : error instanceof Error ? error.message : 'Something went wrong'}
                    </p>
                    <Link to="/" className="btn-secondary mt-10">
                        GO HOME
                    </Link>
                </div>
                <Scripts />
            </body>
        </html>
    );
}
