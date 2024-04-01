import { json, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getNamespaces } from '~/server/mint.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Namespaces - Demeter Hosting' }, { name: 'description', content: 'Namespaces - Demeter Hosting' }];
};

export async function loader() {
    const namespaces = await getNamespaces('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a');
    invariant(namespaces, 'Failed to load namespaces data');
    return json({ namespaces });
}

export default function Namespaces() {
    const { namespaces } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Namespace</h1>

            <div className="content-wrapper mt-4 px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center w-full">
                    <div className="lg:w-3/4">
                        <div className="text-4xl font-semibold">{namespaces[0].name}</div>
                        <div className="label-1 mt-8">Minted</div>
                        <div className="">{formatDateClient(new Date(namespaces[0].timestamp), 'medium', 'short')}</div>
                        <div className="label-1 mt-4">Address</div>
                        <div className="break-words">{namespaces[0].address}</div>
                        <div className="label-1 mt-4">Policy id</div>
                        <div className="break-words">{namespaces[0].policyId}</div>
                    </div>
                    <a
                        href={`https://beta.explorer.cardano.org/en/transaction/${namespaces[0].hash}`}
                        className="btn-secondary-mini text-nowrap inline-flex flex-none"
                        target="_blank"
                        rel="noreferrer"
                    >
                        See transaction
                    </a>
                </div>
            </div>

            <h1 className="title-3xl mt-8">Aliases</h1>

            <div className="content-wrapper mt-4">
                {namespaces && namespaces.length ? (
                    namespaces.map(n => (
                        <div
                            key={n.name}
                            className="border-b border-gray-100 last:border-b-0 p-4 flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center"
                        >
                            <div className="w-3/4">
                                <div className="text-xl font-semibold">{n.name}</div>
                                <div className="label-1 mt-4">Minted</div>
                                <div className="">{formatDateClient(new Date(n.timestamp), 'medium', 'short')}</div>
                                <div className="label-1 mt-4">Address</div>
                                <div className="break-words">{n.address}</div>
                                <div className="label-1 mt-4">Policy id</div>
                                <div className="break-words">{n.policyId}</div>
                            </div>
                            <a
                                href={`https://beta.explorer.cardano.org/en/transaction/${n.hash}`}
                                className="btn-secondary-mini text-nowrap inline-flex"
                                target="_blank"
                                rel="noreferrer"
                            >
                                See transaction
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="p-6 flex items-center justify-center text-gray-600">Your namespaces will appear here</div>
                )}
            </div>
            <Link className="btn-primary mt-8" to="/mint-namespace">
                Mint new alias
            </Link>
        </>
    );
}
