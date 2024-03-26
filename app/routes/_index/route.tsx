import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { useConnectWallet, WalletModal } from '@newm.io/cardano-dapp-wallet-connector';
import { LogoHover } from '~/fragments/icons';

export const meta: MetaFunction = () => {
    return [{ title: 'Demeter Hosting' }, { name: 'description', content: 'Demeter Hosting' }];
};

export default function Index() {
    const { wallet } = useConnectWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    return (
        <>
            <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />

            {/* Navbar */}
            <header className="h-20 w-full fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm">
                <div className="wrapper h-full flex justify-between items-center">
                    <Link className="flex items-center group" to="/">
                        <LogoHover className="w-20 md:w-36" />
                    </Link>
                    <div>
                        {wallet && (
                            <div>
                                <button className="flex items-center text-right justify-end" onClick={() => setIsWalletModalOpen(true)}>
                                    <img className="w-8 mr-1" src={wallet.icon} alt={wallet.name} />
                                    <div className="font-bold capitalize text-xl">{wallet.name}</div>
                                </button>
                                <div className="text-green1 text-xs uppercase font-mono font-semibold text-right">Connected</div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Above the fold */}
            <section className="wrapper h-screen flex flex-col md:flex-row relative">
                <div className="flex flex-col flex-1 md:flex-[0_0_45%] lg:flex-[0_0_50%] justify-center md:pr-5">
                    <div className="flex items-center mt-2"></div>
                    <h1 className="text-center md:text-left dark:text-gray-100 text-6xl lg:text-7xl xl:text-8xl font-extrabold mt-3">
                        Distributed Frontend Hosting
                    </h1>
                    <div className="flex items-center mt-10">
                        <div className="bg-accent1/80 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center sm:text-lg text-white font-bold flex-none">
                            1
                        </div>
                        <p className="copy-2xl ml-3">Mint your namespace</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="bg-accent1/80 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center sm:text-lg text-white font-bold flex-none">
                            2
                        </div>
                        <p className="copy-2xl ml-3">Top up DCUs</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="bg-accent1/80 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center sm:text-lg text-white font-bold flex-none">
                            3
                        </div>
                        <p className="copy-2xl ml-3">
                            Select hosts from the grid and <span className="font-bold">deploy</span>!
                        </p>
                    </div>

                    {!wallet ? (
                        <button className="btn-primary-large mt-8" onClick={() => setIsWalletModalOpen(true)}>
                            Connect wallet to get started
                        </button>
                    ) : (
                        <Link className="btn-primary-large mt-8" to="/mint-namespace">
                            Mint your namespace
                        </Link>
                    )}

                    <div className="flex gap-6 mt-4">
                        <a className="link-text" href="https://rfcs.txpipe.io/0005-demeter-fabric" target="_blank" rel="noreferrer">
                            Read paper
                        </a>
                        <a className="link-text" href="https://rfcs.txpipe.io/0005-demeter-fabric" target="_blank" rel="noreferrer">
                            See docs
                        </a>
                    </div>
                </div>
                <div className="hidden md:flex flex-col md:flex-[0_0_55%] lg:flex-[0_0_50%] sm:justify-center">
                    <img src="/assets/graphics/hero-img.svg" alt="A decentralized world by TxPipe" className="" />
                </div>
            </section>
        </>
    );
}
