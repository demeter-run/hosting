import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formatDateClient } from '~/helpers/date';
import invariant from '~/helpers/invariant';
import { getPageData } from '~/server/namespace.server';
export const meta: MetaFunction = () => {
    return [{ title: 'Namespaces - Demeter Hosting' }, { name: 'description', content: 'Namespaces - Demeter Hosting' }];
};

export async function loader() {
    const data = await getPageData();
    invariant(data, 'Failed to load namespace data');

    return json({ data });
}

export default function Namespaces() {
    const { data } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Namespace</h1>

            <div className="content-wrapper mt-4 px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:items-center w-full">
                    <div className="lg:w-3/4">
                        <div className="text-4xl font-semibold">{data.namespace.name}</div>
                        <div className="label-1 mt-8">Minted</div>
                        <div className="">{formatDateClient(new Date(data.namespace.timestamp), 'medium', 'short')}</div>
                        <div className="label-1 mt-4">Address</div>
                        <div className="break-words">{data.namespace.address}</div>
                        <div className="label-1 mt-4">Policy id</div>
                        <div className="break-words">{data.namespace.policyId}</div>
                    </div>
                    <a
                        href={`https://beta.explorer.cardano.org/en/transaction/${data.namespace.hash}`}
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
                {data.aliases.length ? (
                    data.aliases.map(a => (
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
