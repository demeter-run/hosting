import { NavLink } from '@remix-run/react';

export default function Navbar() {
    return (
        <header className="wrapper">
            <div className="h-16 flex items-center">
                <a className="flex items-center" href="/">
                    <img className="w-5" src="/assets/logos/demeter-isotype-black.svg" alt="Demeter" />
                    <div className="text-xl ml-1 font-semibold">Hosting</div>
                </a>
                <div className="hs-dropdown relative inline-flex ml-10">
                    <button
                        id="hs-dropdown-default"
                        type="button"
                        className="hs-dropdown-toggle inline-flex items-center gap-x-2 font-semibold text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                    >
                        My project
                        <svg
                            className="hs-dropdown-open:rotate-180 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    <div
                        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                        aria-labelledby="hs-dropdown-default"
                    >
                        <a
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                            href="/"
                        >
                            My other project
                        </a>

                        <a
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                            href="/"
                        >
                            New project...
                        </a>
                    </div>
                </div>

                <div className="ml-auto"></div>
            </div>

            <div className="flex items-center h-10">
                <div className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white dark:bg-gray-800">
                    <nav className="max-w-[85rem] w-full sm:flex sm:items-center sm:justify-between" aria-label="Global">
                        <div className="flex items-center justify-between">
                            <div className="sm:hidden">
                                <button
                                    type="button"
                                    className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    data-hs-collapse="#navbar-collapse-with-animation"
                                    aria-controls="navbar-collapse-with-animation"
                                    aria-label="Toggle navigation"
                                >
                                    <svg
                                        className="hs-collapse-open:hidden flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="3" x2="21" y1="6" y2="6" />
                                        <line x1="3" x2="21" y1="12" y2="12" />
                                        <line x1="3" x2="21" y1="18" y2="18" />
                                    </svg>
                                    <svg
                                        className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            id="navbar-collapse-with-animation"
                            className="hs-collapse hidden text-sm overflow-hidden transition-all duration-300 basis-full grow sm:block"
                        >
                            <div className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:mt-0">
                                {NAV_MENU.map(item => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.end}
                                        className={({ isActive }) =>
                                            'font-medium' +
                                            (isActive
                                                ? ' text-accent1'
                                                : ' text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50')
                                        }
                                    >
                                        {item.title}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

const NAV_MENU = [
    {
        title: 'Dashboard',
        to: '/project',
        end: true,
    },
    {
        title: 'Builds',
        to: '/project/builds',
    },
    {
        title: 'Monitor',
        to: '/project/monitor',
    },
    {
        title: 'Settings',
        to: '/project/settings',
    },
];
