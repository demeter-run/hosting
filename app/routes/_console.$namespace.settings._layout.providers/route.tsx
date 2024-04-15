import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import invariant from '~/helpers/invariant';
import { getPageData, handlePageAction } from '~/server/providers.server';
import CardProvider from './card-provider';
import { PageLoader } from '~/fragments/page-loader';
import { useMemo } from 'react';

export const meta: MetaFunction = () => {
    return [{ title: 'Providers - Demeter Hosting' }, { name: 'description', content: 'Providers - Demeter Hosting' }];
};

export async function loader() {
    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const result = await handlePageAction(data);
    return json(result);
}

export default function Providers() {
    const { pageData: pd } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const fetcherRunning = useMemo(() => fetcher.state === 'loading' || fetcher.state === 'submitting', [fetcher.state]);

    const handleProviderChange = (checked: boolean, providerId: number) => {
        fetcher.submit({ intent: 'update_provider_status', providerId, enable: checked }, { method: 'POST' });
    };

    return (
        <>
            {fetcherRunning && <PageLoader />}
            <h1 className="title-3xl">Select providers</h1>

            <div className="grid lg:grid-cols-2 gap-8 mt-4">
                {pd.providers.map(p => (
                    <CardProvider key={p.id} provider={p} handleProviderChange={handleProviderChange} fetcherRunning={fetcherRunning} />
                ))}
            </div>
        </>
    );
}
