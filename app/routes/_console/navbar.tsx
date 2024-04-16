import { Link, NavLink, useParams } from '@remix-run/react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '~/fragments/icons';
import { Namespace } from '~/helpers/types';

type NavbarProps = {
    namespaces: Namespace[];
};

export default function Navbar(props: NavbarProps) {
    const { namespaces } = props;
    const namespace = useParams().namespace;

    return (
        <header className="wrapper flex sm:flex-col items-center sm:items-start">
            <div className="h-16 flex items-center">
                <a className="flex items-center" href="/">
                    <img className="w-5" src="/assets/logos/demeter-isotype-black.svg" alt="Demeter" />
                    <div className="text-xl ml-2 font-semibold">Hosting</div>
                </a>

                <ChevronRightIcon className="w-5 mt-[2px] mx-2" />

                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-xl font-normal text-gray-900">
                        {namespace}
                        <ChevronDownIcon className="w-4 mt-2" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 py-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {namespaces.map(n => (
                                    <Menu.Item key={n.name}>
                                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100" to={`/${n.name}/`}>
                                            {n.name}
                                        </Link>
                                    </Menu.Item>
                                ))}
                                <div className="px-4 py-2">
                                    <div className="divider" />
                                </div>
                                <Menu.Item>
                                    <Link className="block px-4 py-2 text-sm hover:bg-gray-100" to="/mint-namespace">
                                        Mint new namespace
                                    </Link>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            <div className="sm:flex sm:items-center sm:w-auto h-8 sm:h-10 ml-4 sm:ml-0 sm:mr-0 relative">
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
                            className="hs-collapse hidden text-sm overflow-hidden transition-all duration-300 basis-full grow sm:block pl-6 pr-6 pb-6 sm:p-0 border-gray-50 border-b border-l border-r sm:border-none rounded-b-md sm:rounded-none bg-white dark:bg-gray-800 mt-4 sm:mt-0"
                        >
                            <div className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:mt-0">
                                {getMenu(namespace).map(item => (
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

function getMenu(namespace: string | undefined) {
    return [
        {
            title: 'Dashboard',
            to: `/${namespace}`,
            end: true,
        },
        {
            title: 'Builds',
            to: `/${namespace}/builds`,
        },
        {
            title: 'Monitor',
            to: `/${namespace}/monitor`,
        },
        {
            title: 'Settings',
            to: `/${namespace}/settings`,
        },
    ];
}
