type Namespace = {
    policyId: string;
    name: string;
    timestamp: string | number;
};

// TODO: is policy id a string or a number?

export function getNamespaces(): Namespace[] {
    return [
        {
            policyId: 's8djrm48dj',
            name: 'githoney',
            timestamp: 1609593559000,
        },
        {
            policyId: 'vmd84js652',
            name: 'gitbounties',
            timestamp: 1609593559000,
        },
        {
            policyId: 'djv84jsye',
            name: 'txpipebounties',
            timestamp: 1609593559000,
        },
    ];
}
