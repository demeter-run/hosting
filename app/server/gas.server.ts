import { mockApiCall } from '~/helpers/misc';
import { gasLedgerItem } from '~/helpers/types';

type PageTypes = {
    balance: number;
    gasLedger: gasLedgerItem[];
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        balance: 1000000,
        gasLedger: [
            {
                id: 1,
                timestamp: 1642345260000,
                dcus: 3450467,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'topup',
            },
            {
                id: 2,
                timestamp: 1642518000000,
                provider: 'Blink Labs',
                requests: 10234,
                dcus: 12367364,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'charge',
            },
            {
                id: 2,
                timestamp: 1642518000000,
                provider: 'TxPipe',
                requests: 10234,
                dcus: 12367364,
                hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
                type: 'charge',
            },
        ],
    };
}
