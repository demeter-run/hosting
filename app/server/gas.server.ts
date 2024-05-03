import { mockApiCall } from '~/helpers/misc';
import { gasLedgerItem } from '~/helpers/types';

type PageTypes = {
    balance: number;
    address: string;
    gasLedger: gasLedgerItem[];
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        balance: 1000000,
        address: 'addr1qxjtluvvk7xfjprjys3y08rhpd0ru8462543tydxvdyfr6uzwmsl2h24j0pa53yevcr0dgfrmv6svmf83guz4pzvxcc07ssn0szv',
        gasLedger: [
            {
                id: 1,
                timestamp: 1642345260000,
                dcus: 3450467,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'topup',
                txStatus: 'pending',
            },
            {
                id: 2,
                timestamp: 1642518000000,
                provider: 'Blink Labs',
                requests: 10234,
                dcus: 12367364,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'charge',
                txStatus: 'confirmed',
            },
            {
                id: 3,
                timestamp: 1642345260000,
                dcus: 3450467,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'topup',
                txStatus: 'confirmed',
            },
            {
                id: 4,
                timestamp: 1642518000000,
                provider: 'TxPipe',
                requests: 10234,
                dcus: 12367364,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'charge',
                txStatus: 'confirmed',
            },
            {
                id: 5,
                timestamp: 1642345260000,
                dcus: 3450467,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'topup',
                txStatus: 'expired',
            },
        ],
    };
}

export async function handlePageAction(data: FormData) {
    const intent = data.get('intent') as string;
    console.log(intent);

    switch (intent) {
        case 'top_up_dcus': {
            const dcus = data.get('dcus') as string;
            const namespace = data.get('namespace') as string;
            console.log(dcus);
            console.log(namespace);
            await mockApiCall();
            return {
                intent: 'top_up_dcus',
                cbor: '84a400828258206c732139de33e916342707de2aebef2252c781640326ff37b86ec99d97f1ba8d0182582018f86700660fc88d0370a8f95ea58f75507e6b27a18a17925ad3b1777eb0d77600018783581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a0582054ad3c112d58e8946480e21d6a35b2a215d1a9a8f540c13714ded86e4b0b6aea83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820ed33125018c5cbc9ae1b242a3ff8f3db2e108e4a63866d0b5238a34502c723ed83581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820b0ea85f16a443da7f60704a427923ae1d89a7dc2d6621d805d9dd441431ed70083581d703a888d65f16790950a72daee1f63aa05add6d268434107cfa5b67712821a000f52c6a05820831a557bc2948e1b8c9f5e8e594d62299abff4eb1a11dc19da38bfaf9f2',
            };
        }
        default:
            return null;
    }
}
