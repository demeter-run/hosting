export type Namespace = {
    name: string;
    address: string;
    policyId: string;
    timestamp: string | number;
    hash: string;
};

export type gasLedgerItem = {
    id: number;
    timestamp: string | number;
    provider?: string;
    dcus: number;
    requests?: number;
    hash: string;
    type: string;
    txStatus: 'pending' | 'confirmed' | 'expired';
};

export type Provider = {
    id: number;
    name: string;
    location: string;
    logo: string;
    features?: string[];
    supportLink?: string;
    isEnabled: boolean;
};

export type ActivityItem = {
    id: number;
    timestamp: string | number;
    requests: number;
    dcus: number;
    provider: string;
};

export type Build = {
    id: number;
    branch: string;
    commit: string;
    commitFullSha: string;
    message: string;
    author: string;
    timestamp: string | number;
    current: boolean;
};

export type Log = {
    timestamp: string;
    msg: string;
    provider: string;
};
