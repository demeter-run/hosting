import { useState } from 'react';
import { useConnectWallet, WalletModal } from '@newm.io/cardano-dapp-wallet-connector';

export default function WalletNotFound() {
    const { error } = useConnectWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    return (
        <>
            <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-balance">
                    <h1 className="text-5xl font-bold">Wallet not connected</h1>
                    {error && <div className="mt-4 text-lg">Error: {error}</div>}
                    <button className="btn-primary-large mt-8 mx-auto" onClick={() => setIsWalletModalOpen(true)}>
                        Connect wallet
                    </button>
                </div>
            </div>
        </>
    );
}
