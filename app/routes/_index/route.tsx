import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Demeter Hosting' }, { name: 'description', content: 'Demeter Hosting' }];
};

export default function Index() {
    return (
        <>
            {/* Navbar */}
            <header className="h-20 w-full fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-sm">
                <div className="wrapper h-full flex justify-between items-center">
                    <Link className="flex items-center group" to="/">
                        <svg className="w-20 md:w-36" viewBox="0 0 5229 1415" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1818.06 1037H1599.98V369.6H1818.06C2008.88 369.6 2140.48 482.4 2140.48 690.14V716.46C2140.48 922.32 2010.76 1037 1818.06 1037ZM1679.88 439.16V967.44H1811.48C1962.82 967.44 2057.76 887.54 2057.76 716.46V690.14C2057.76 520.94 1963.76 439.16 1809.6 439.16H1679.88ZM2453.14 1048.28C2307.44 1048.28 2223.78 947.7 2223.78 804.82V786.96C2223.78 643.14 2309.32 543.5 2452.2 543.5C2605.42 543.5 2677.8 648.78 2671.22 810.46H2300.86C2302.74 922.32 2359.14 984.36 2453.14 984.36C2529.28 984.36 2576.28 949.58 2592.26 887.54H2668.4C2644.9 989.06 2567.82 1048.28 2453.14 1048.28ZM2302.74 749.36H2592.26C2584.74 660.06 2537.74 607.42 2452.2 607.42C2365.72 607.42 2313.08 657.24 2302.74 749.36ZM2843.12 1037H2767.92V554.78H2841.24L2842.18 630.92C2868.5 582.98 2918.32 543.5 2994.46 543.5C3067.78 543.5 3116.66 578.28 3139.22 639.38C3173.06 578.28 3227.58 543.5 3299.96 543.5C3406.18 543.5 3459.76 611.18 3459.76 723.04V1037H3384.56V739.02C3384.56 652.54 3351.66 608.36 3278.34 608.36C3198.44 608.36 3151.44 668.52 3151.44 764.4V1037H3076.24V739.02C3076.24 653.48 3045.22 608.36 2971.9 608.36C2892 608.36 2843.12 668.52 2843.12 766.28V1037ZM3786.47 1048.28C3640.77 1048.28 3557.11 947.7 3557.11 804.82V786.96C3557.11 643.14 3642.65 543.5 3785.53 543.5C3938.75 543.5 4011.13 648.78 4004.55 810.46H3634.19C3636.07 922.32 3692.47 984.36 3786.47 984.36C3862.61 984.36 3909.61 949.58 3925.59 887.54H4001.73C3978.23 989.06 3901.15 1048.28 3786.47 1048.28ZM3636.07 749.36H3925.59C3918.07 660.06 3871.07 607.42 3785.53 607.42C3699.05 607.42 3646.41 657.24 3636.07 749.36ZM4287.64 1048.28C4191.76 1048.28 4141 1004.1 4141 915.74V614.94H4044.18V554.78H4141V406.26H4216.2V554.78H4354.38V614.94H4216.2V905.4C4216.2 958.98 4234.06 984.36 4297.04 984.36C4315.84 984.36 4342.16 979.66 4358.14 974.96V1038.88C4338.4 1043.58 4308.32 1048.28 4287.64 1048.28ZM4650.72 1048.28C4505.02 1048.28 4421.36 947.7 4421.36 804.82V786.96C4421.36 643.14 4506.9 543.5 4649.78 543.5C4803 543.5 4875.38 648.78 4868.8 810.46H4498.44C4500.32 922.32 4556.72 984.36 4650.72 984.36C4726.86 984.36 4773.86 949.58 4789.84 887.54H4865.98C4842.48 989.06 4765.4 1048.28 4650.72 1048.28ZM4500.32 749.36H4789.84C4782.32 660.06 4735.32 607.42 4649.78 607.42C4563.3 607.42 4510.66 657.24 4500.32 749.36ZM5040.7 1037H4965.5V554.78H5038.82L5039.76 647.84C5068.9 581.1 5122.48 543.5 5189.22 543.5C5196.74 543.5 5205.2 543.5 5214.6 545.38V620.58C5204.26 619.64 5197.68 619.64 5187.34 619.64C5099.92 619.64 5040.7 673.22 5040.7 778.5V1037Z"
                                fill="#000"
                                className="group-hover:fill-accent2 transition-all"
                            />
                            <path
                                d="M17.6899 363.3V1051.36L613.57 1395.38L1209.44 1051.36V363.3L613.57 19.28L17.6899 363.3Z"
                                stroke="#000"
                                strokeWidth="33.39"
                                strokeMiterlimit="10"
                                className="group-hover:stroke-accent2 transition-all"
                            />
                            <path
                                d="M621.82 19.62L324.31 193.77L920.48 534.1L919.7 880.63L621.82 1052.6L620.72 363.03L323.79 535.6V1224.62L621.82 1395.72L1217.69 1051.69V363.64L621.82 19.62Z"
                                fill="#000"
                                className="group-hover:fill-accent2 transition-all"
                            />
                        </svg>
                    </Link>

                    {/* <button onClick={handleThemeChange}>
                        {theme === 'light' ? (
                            <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>
                        ) : (
                            <svg className="w-8 fill-gray-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        )}
                    </button> */}
                </div>
            </header>

            {/* Hero */}
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
                    <Link className="btn-primary-large mt-8" to="/project">
                        Connect wallet to get started
                    </Link>
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
