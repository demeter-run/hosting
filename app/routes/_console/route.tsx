import { json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { PageLoader } from '~/fragments/page-loader';
import invariant from '~/helpers/invariant';
import Footer from '~/fragments/footer';
import Navbar from '~/routes/_console/navbar';
import { getPageData } from '~/server/console.server';

export async function loader() {
    // TODO: Implement authorization, if not authorized redirect to landing page
    const authorized = true;
    if (!authorized) return redirect(`/`);

    const pageData = await getPageData();
    invariant(pageData, 'Failed to load page data');
    return json({ pageData });
}

export default function Console() {
    const { pageData: pd } = useLoaderData<typeof loader>();
    const { state } = useNavigation();

    return (
        <>
            {state === 'loading' && <PageLoader />}
            <Navbar namespaces={pd.namespaces} />
            <div className="bg-[#fafafa] dark:bg-gray-950 border-t border-b border-gray-50 dark:border-gray-600">
                <div className="wrapper min-h-[calc(100vh-102px)] py-10">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
