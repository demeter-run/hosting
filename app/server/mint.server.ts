import { mockApiCall } from '~/helpers/misc';
import { Namespace } from '~/helpers/types';

type PageTypes = {
    txHash: string;
    txStatus: 'pending' | 'confirmed' | 'expired';
};

export async function getPageData(hash: string): Promise<PageTypes> {
    // const statuses = ['pending', 'confirmed', 'expired'];
    await mockApiCall();
    return {
        txHash: hash,
        txStatus: 'pending',
    };
    // return {
    //     txHash: hash,
    //     txStatus: statuses[Math.floor(Math.random() * statuses.length)],
    // };
}

export async function getNamespaces(address: string): Promise<Namespace[]> {
    console.log(address);
    await mockApiCall();
    return [
        {
            name: 'apollo',
            address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
            policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
        {
            name: 'artemis',
            address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
            policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
        {
            name: 'zeus',
            address: 'addr1qyp9ut60xhp0u936g6qjng29n5usgj7x235qyq22jfzhkqcl2q7csldaa358nhncufmgr2nvxs6t8chnn9v2zssg9g7qxy3kn4',
            policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
    ];
}

export async function handlePageAction(data: FormData) {
    const intent = data.get('intent') as string;
    console.log(intent);
    switch (intent) {
        case 'check_availability': {
            const namespace = data.get('namespace') as string;
            const namespaces = ['demeter', 'apollo', 'zeus', 'hermes', 'athena', 'artemis', 'ares', 'dionysus', 'hades'];
            await mockApiCall();
            return { intent: 'check_availability', isAvailable: !namespaces.includes(namespace) };
        }
        case 'get_cbor': {
            const namespace = data.get('namespace') as string;
            const address = data.get('address') as string;
            console.log(namespace);
            console.log(address);
            await mockApiCall();
            return {
                intent: 'get_cbor',
                cbor: '84a400828258206c732139de33e916342707de2aebef2252c781640326ff37b86ec99d97f1ba8d0182582018f86700660fc88d0370a8f95ea58f75507e6b27a18a17925ad3b1777eb0d77600018783581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a0582054ad3c112d58e8946480e21d6a35b2a215d1a9a8f540c13714ded86e4b0b6aea83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820ed33125018c5cbc9ae1b242a3ff8f3db2e108e4a63866d0b5238a34502c723ed83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820b0ea85f16a443da7f60704a427923ae1d89a7dc2d6621d805d9dd441431ed70083581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820831a557bc2948e1b8c9f5e8e594d62299abff4eb1a11dc19da38bfaf9f2',
            };
        }
        case 'get_tx_status': {
            const hash = data.get('hash') as string;
            console.log(hash);
            await mockApiCall();
            // const statuses = ['pending', 'confirmed', 'expired'];
            // return { intent: 'get_tx_status', txStatus: statuses[Math.floor(Math.random() * statuses.length)] };
            return { intent: 'get_tx_status', txStatus: 'pending' };
        }
        default:
            return null;
    }
}
