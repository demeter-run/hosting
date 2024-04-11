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
};