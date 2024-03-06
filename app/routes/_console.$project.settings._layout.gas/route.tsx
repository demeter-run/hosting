import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Gas - Demeter Hosting' }, { name: 'description', content: 'Gas - Demeter Hosting' }];
};

export default function Gas() {
    return (
        <>
            <h1 className="title-3xl">Gas</h1>
        </>
    );
}
