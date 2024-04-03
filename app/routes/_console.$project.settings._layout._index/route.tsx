import { redirect } from '@remix-run/node';
import { Params } from '@remix-run/react';

export const loader = async ({ params }: { params: Params }) => {
    const { project } = params;
    return redirect(`/${project}/settings/providers`);
};
