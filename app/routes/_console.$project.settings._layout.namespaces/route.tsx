import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDate } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getNamespaces } from '~/server/namespaces.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Namespaces - Demeter Hosting' }, { name: 'description', content: 'Namespaces - Demeter Hosting' }];
};

export async function loader() {
    const namespaces = getNamespaces();

    invariant(namespaces, 'Failed to load namespaces data');

    return json({ namespaces });
}

export default function Namespaces() {
    const { namespaces } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Namespaces</h1>
            <div className="content-wrapper mt-4">
                {namespaces.length ? (
                    namespaces.map(n => (
                        <div
                            key={n.policyId}
                            className="border-b border-gray-100 last:border-b-0 p-4 flex flex-col md:flex-row md:items-center gap-3"
                        >
                            <div className="flex w-full flex-col lg:flex-row lg:items-center gap-4">
                                <div className="lg:w-40 font-semibold">{n.name}</div>
                                <div className="lg:w-40">
                                    <div className="label-1">Policy id</div>
                                    <div className="">{n.policyId}</div>
                                </div>
                                <div className="lg:w-48">
                                    <div className="label-1">Minted</div>
                                    <div className="">{formatDate(new Date(n.timestamp), 'medium', 'short')}</div>
                                </div>
                            </div>

                            <div className="md:ml-auto">
                                <a
                                    href={`https://beta.explorer.cardano.org/en/transaction/${n.hash}`}
                                    className="btn-secondary-mini text-nowrap inline-flex"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    See transaction
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 flex items-center justify-center text-gray-600">Your namespaces will appear here</div>
                )}
            </div>
            <button className="btn-primary mt-8">Mint new namespace</button>
        </>
    );
}
