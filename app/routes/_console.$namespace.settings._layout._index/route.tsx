import { redirect } from '@remix-run/node';
import { Params } from '@remix-run/react';

export const loader = async ({ params }: { params: Params }) => {
    const { namespace } = params;
    return redirect(`/${namespace}/settings/providers`);
};
