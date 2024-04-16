import { mockApiCall } from '~/helpers/misc';
import { Build } from '~/helpers/types';

type PageTypes = {
    builds: Build[];
    github: {
        organization: string;
        repository: string;
    };
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        builds: [
            {
                id: 1,
                branch: 'main',
                commit: 'aefe63c',
                commitFullSha: '2ae4bfc270b512faf3a1302b875a5bcf71c2934f',
                message: 'updated ui components',
                author: 'John Doe',
                timestamp: 1709593559000,
                current: true,
            },
            {
                id: 2,
                branch: 'main',
                commit: 'ab0057ee',
                commitFullSha: '2ae4bfc270b512faf3a1302b875a5bcf71c2934f',
                message: 'fixed app crashing all the time',
                author: 'Jane Doe',
                timestamp: 1609593559000,
                current: false,
            },
            {
                id: 3,
                branch: 'main',
                commit: 'ad34eab',
                commitFullSha: '2ae4bfc270b512faf3a1302b875a5bcf71c2934f',
                message: 'initial commit',
                author: 'John Doe',
                timestamp: 1609593559000,
                current: false,
            },
        ],
        github: {
            organization: 'demeter-run',
            repository: 'hosting',
        },
    };
}

export async function handlePageAction(data: FormData) {
    const intent = data.get('intent') as string;
    console.log(intent);
    switch (intent) {
        case 'set_production_build': {
            const buildId = data.get('buildId') as string;
            console.log(buildId);
            await mockApiCall();
            // When the promise is resolved the loader will re-run and the UI will update
            return null;
        }
        default:
            return null;
    }
}
