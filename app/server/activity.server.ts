import { mockApiCall } from '~/helpers/misc';
import { ActivityItem } from '~/helpers/types';

type PageTypes = {
    activity: ActivityItem[];
};

// TODO: Define if we need a separate id or we can use the timestamp as id

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        activity: [
            {
                id: 1,
                timestamp: 1642345200000,
                requests: 4567,
                dcus: 3450467,
            },
            {
                id: 2,
                timestamp: 1642431600000,
                requests: 10234,
                dcus: 12367364,
            },
            {
                id: 3,
                timestamp: 1642518000000,
                requests: 12489,
                dcus: 14367364,
            },
            {
                id: 4,
                timestamp: 1642604400000,
                requests: 3409,
                dcus: 4450467,
            },
            {
                id: 5,
                timestamp: 1642690800000,
                requests: 7456,
                dcus: 3450467,
            },
            {
                id: 6,
                timestamp: 1642777200000,
                requests: 2367,
                dcus: 12367364,
            },
            {
                id: 7,
                timestamp: 1642863600000,
                requests: 5683,
                dcus: 14367364,
            },
            {
                id: 8,
                timestamp: 1642950000000,
                requests: 9234,
                dcus: 4450467,
            },
            {
                id: 9,
                timestamp: 1643036400000,
                requests: 12345,
                dcus: 4450467,
            },
        ],
    };
}
