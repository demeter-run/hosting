type Namespace = {
    policyId: string;
    name: string;
    timestamp: string | number;
    hash: string;
};

// TODO: is policy id a string or a number?

export function getNamespaces(): Namespace[] {
    return [
        {
            policyId: 's8djrm48dj',
            name: 'githoney',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
        {
            policyId: 'vmd84js652',
            name: 'gitbounties',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
        {
            policyId: 'djv84jsye',
            name: 'txpipebounties',
            timestamp: 1609593559000,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
    ];
}
