import { EnabledWallet } from '@newm.io/cardano-dapp-wallet-connector';
import cbor from 'cbor';

export async function getDecodedBalance(wallet: EnabledWallet): Promise<number> {
    const balance = await wallet.getBalance();
    return new Promise((resolve, reject) => {
        cbor.decodeFirst(balance, (error, decodedValue) => {
            if (error) {
                console.error('Error decoding CBOR:', error);
                reject(error);
            }
            if (typeof decodedValue === 'number') {
                resolve(decodedValue / 1_000_000);
            } else {
                console.error('Invalid CBOR format');
                reject(new Error('Invalid CBOR format'));
            }
        });
    });
}

// export async function getWalletAddress(wallet: EnabledWallet | null): Promise<string> {
//     if (!wallet) {
//         throw new Error('No wallet selected');
//     }
//     const [usedAddresses, unusedAddresses] = await Promise.all([wallet.getUsedAddresses(), wallet.getUnusedAddresses()]);
//     const address = [...usedAddresses, ...unusedAddresses][0];

//     if (!address) {
//         throw new Error('Unable to fetch wallet address');
//     }

//     console.log('Wallet address:', address)

//     // return addressFromHex(address);
// }
