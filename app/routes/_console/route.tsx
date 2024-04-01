import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import invariant from '~/helpers/invariant';
import Footer from '~/routes/_console/footer';
import Navbar from '~/routes/_console/navbar';
import { getProjectData } from '~/server/project.server';

export async function loader({ params }: LoaderFunctionArgs) {
    // TODO: Implement authorization
    const authorized = true;
    if (!authorized) return redirect(`/`);

    // Gets project data so it's available to all child routes with useMatches
    const projectData = await getProjectData(params.project as string);
    invariant(projectData, 'Failed to load project data');
    return json({ projectData });
}

export default function Console() {
    return (
        <>
            <Navbar />
            <div className="bg-[#fafafa] dark:bg-gray-950 border-t border-b border-gray-50 dark:border-gray-600">
                <div className="wrapper min-h-[calc(100vh-102px)] py-10">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
