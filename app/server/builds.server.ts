import { Provider } from './providers.server';

type Build = {
    id: number;
    branch: string;
    commit: string;
    commitFullSha?: string;
    message: string;
    author: string;
    timestamp: string | number;
    current: boolean;
};

export function getBuilds(): Promise<Build[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
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
            ]);
        }, 1000);
    });
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

export function getProdBuild(): Promise<ProdBuild> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
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
                    },
                    {
                        id: 2,
                        name: 'Blink Labs',
                        location: 'US Central',
                        logo: '/assets/logos/blink-labs.svg',
                    },
                ],
                activeFeatures: ['Cardano Node', 'DB-Sync', 'Ogmios', 'Kupo', 'Blockfrost RYO'],
            });
        }, 1000);
    });
}
