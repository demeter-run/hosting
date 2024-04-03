import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from '~/helpers/invariant';
import { getProviders } from '~/server/providers.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Providers - Demeter Hosting' }, { name: 'description', content: 'Providers - Demeter Hosting' }];
};

export async function loader() {
    const providers = await getProviders();
    invariant(providers, 'Failed to load providers data');

    return json({ providers });
}

export default function Providers() {
    const { providers } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="title-3xl">Select providers</h1>

            <div className="grid lg:grid-cols-2 gap-8 mt-4">
                {providers.map(p => (
                    <div key={p.id} className="card-base">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img className="h-10" src={p.logo} alt={p.name} />
                                <div className="font-medium text-2xl" title="Name">
                                    {p.name}
                                </div>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="hs-basic-usage"
                                    className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-accent1 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-accent1 checked:border-accent1 focus:checked:border-accent1 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-gray-100/80 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-gray-100/80"
                                />
                                <label htmlFor="hs-basic-usage" className="sr-only">
                                    switch
                                </label>
                            </div>
                        </div>
                        <div className="label-1 mt-5">Region</div>
                        <div className="font-medium">{p.location}</div>
                        <div className="label-1 mt-4">Features</div>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {p.features?.map((f, i) => (
                                <div key={i} className="tag-accent1">
                                    {f}
                                </div>
                            ))}
                        </div>
                        {p.supportLink && (
                            <a href={p.supportLink} target="_blank" rel="noopener noreferrer" className="btn-secondary-mini mt-8">
                                get support
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
