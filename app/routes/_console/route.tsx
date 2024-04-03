import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { PageLoader } from '~/fragments/page-loader';
import invariant from '~/helpers/invariant';
import Footer from '~/routes/_console/footer';
import Navbar from '~/routes/_console/navbar';
import { getNamespaces } from '~/server/mint.server';
import { getProjectData } from '~/server/project.server';

export async function loader({ params }: LoaderFunctionArgs) {
    // TODO: Implement authorization, if not authorized redirect to landing page
    const authorized = true;
    if (!authorized) return redirect(`/`);

    // Gets project data so it's available to all child routes with useMatches
    const projectData = await getProjectData(params.project as string);
    invariant(projectData, 'Failed to load project data');

    // Gets wallet namespaces so it's available to all child routes with useMatches
    const walletNamespaces = await getNamespaces(projectData.namespace.address);
    invariant(walletNamespaces, 'Failed to load wallet namespaces');

    return json({ projectData, walletNamespaces });
}

export default function Console() {
    const { walletNamespaces } = useLoaderData<typeof loader>();
    const { state } = useNavigation();
    return (
        <>
            {state === 'loading' && <PageLoader />}
            <Navbar walletNamespaces={walletNamespaces} />
            <div className="bg-[#fafafa] dark:bg-gray-950 border-t border-b border-gray-50 dark:border-gray-600">
                <div className="wrapper min-h-[calc(100vh-102px)] py-10">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
