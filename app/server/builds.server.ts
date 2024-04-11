import { mockApiCall } from '~/helpers/misc';
import { Build, Provider } from '~/helpers/types';

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

type ProdBuild = {
    id: number;
    branch: string;
    commit: string;
    commitFullSha: string;
    message: string;
    author: string;
    timestamp: string | number;
    current: boolean;
    screenshot: string;
    status: string;
    providers: Provider[];
    activeFeatures: string[];
};

export async function getProdBuild(): Promise<ProdBuild> {
    await mockApiCall();
    return {
        id: 1,
        branch: 'main',
        commit: 'aefe63c',
        commitFullSha: '2ae4bfc270b512faf3a1302b875a5bcf71c2934f',
        message: 'updated ui components',
        author: 'John Doe',
        timestamp: 1609593559000,
        current: true,
        screenshot: '/assets/graphics/website-screenshot-fpo.png',
        status: 'live',
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
                isEnabled: false,
            },
        ],
        activeFeatures: ['Cardano Node', 'DB-Sync', 'Ogmios', 'Kupo', 'Blockfrost RYO'],
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
