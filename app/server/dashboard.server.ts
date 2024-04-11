import { mockApiCall } from '~/helpers/misc';
import { Build, Provider } from '~/helpers/types';

type PageTypes = {
    build: Build;
    github: {
        org: string;
        project: string;
    };
    activeFeatures: string[];
    providers: Provider[];
    status: string;
    screenshot: string;
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        build: {
            id: 1,
            branch: 'main',
            commit: 'aefe63c',
            commitFullSha: '2ae4bfc270b512faf3a1302b875a5bcf71c2934f',
            message: 'updated ui components',
            author: 'John Doe',
            timestamp: 1709593559000,
            current: true,
        },
        github: {
            org: 'demeter-run',
            project: 'hosting',
        },
        activeFeatures: ['Cardano Node', 'DB-Sync', 'Ogmios', 'Kupo', 'Blockfrost RYO'],
        providers: [
            {
                id: 1,
                name: 'TxPipe',
                location: 'US Central',
                logo: '/assets/logos/txpipe.svg',
                isEnabled: true,
            },
            {
                id: 2,
                name: 'Blink Labs',
                location: 'US Central',
                logo: '/assets/logos/blink-labs.svg',
                isEnabled: true,
            },
        ],
        status: 'live',
        screenshot: '/assets/graphics/website-screenshot-fpo.png',
    };
}

type UpdateProdBuildPayload = {
    buildId: string;
    enabled: boolean;
};

export async function updateProdBuild(payload: UpdateProdBuildPayload) {
    const { buildId, enabled } = payload;
    console.log(buildId);
    console.log(enabled);
    // When the promise is resolved the loader will re-run and the UI will update
    await mockApiCall();
}
