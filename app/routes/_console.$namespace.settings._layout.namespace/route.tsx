import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getPageData } from '~/server/namespace.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Namespaces - Demeter Hosting' }, { name: 'description', content: 'Namespaces - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export default function Namespaces() {
    const { pageData: pd } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Namespace</h1>

            <div className="content-wrapper mt-4 px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center w-full">
                    <div className="lg:w-3/4">
                        <div className="text-4xl font-semibold">{pd.namespace.name}</div>
                        <div className="label-1 mt-8">Minted</div>
                        <div className="">{formatDateClient(new Date(pd.namespace.timestamp), 'medium', 'short')}</div>
                        <div className="label-1 mt-4">Address</div>
                        <div className="break-words">{pd.namespace.address}</div>
                        <div className="label-1 mt-4">Policy id</div>
                        <div className="break-words">{pd.namespace.policyId}</div>
                    </div>
                    <a
                        href={`https://beta.explorer.cardano.org/en/transaction/${pd.namespace.hash}`}
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
                <div className="p-6 flex items-center justify-center text-gray-600">Coming soon...</div>
            </div>

            {/* <div className="content-wrapper mt-4">
                {pd.aliases.length ? (
                    pd.aliases.map(a => (
                        <div
                            key={a.name}
                            className="border-b border-gray-100 last:border-b-0 p-4 flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center"
                        >
                            <div className="w-3/4">
                                <div className="text-xl font-semibold">{a.name}</div>
                                <div className="label-1 mt-4">Minted</div>
                                <div className="">{formatDateClient(new Date(a.timestamp), 'medium', 'short')}</div>
                                <div className="label-1 mt-4">Address</div>
                                <div className="break-words">{a.address}</div>
                                <div className="label-1 mt-4">Policy id</div>
                                <div className="break-words">{a.policyId}</div>
                            </div>
                            <a
                                href={`https://beta.explorer.cardano.org/en/transaction/${a.hash}`}
                                className="btn-secondary-mini text-nowrap inline-flex"
                                target="_blank"
                                rel="noreferrer"
                            >
                                See transaction
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="p-6 flex items-center justify-center text-gray-600">Your aliases will show up here</div>
                )}
            </div>
            <Link className="btn-primary mt-8" to="/mint-namespace">
                Mint new alias
            </Link> */}
        </>
    );
}
