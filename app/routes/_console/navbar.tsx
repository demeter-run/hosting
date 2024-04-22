import { Link, NavLink, useParams } from '@remix-run/react';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon, ChevronRightIcon } from '~/fragments/icons';
import { Namespace } from '~/helpers/types';

type NavbarProps = {
    namespaces: Namespace[];
};

export default function Navbar(props: NavbarProps) {
    const { namespaces } = props;
    const namespace = useParams().namespace;
    const [isNavOpen, setIsNavOpen] = useState(false);

    function handleMenuClick() {
        setIsNavOpen(!isNavOpen);
        document.body.style.overflow = isNavOpen ? 'auto' : 'hidden';
    }

    function handleNavClick() {
        setIsNavOpen(false);
        document.body.style.overflow = 'auto';
    }

    return (
        <header className="wrapper">
            <div className="h-16 flex items-center">
                <button
                    className="sm:hidden border w-8 h-8 border-gray-400 rounded-lg mr-4 flex items-center justify-center flex-none"
                    onClick={handleMenuClick}
                >
                    <Bars3Icon className="w-4" />
                </button>
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

            <div
                className={`${
                    isNavOpen ? 'flex' : 'hidden sm:flex'
                } py-8 sm:py-4 flex-col sm:flex-row gap-8 fixed sm:static top-16 bg-white w-full left-0 px-6 sm:px-0 border-b border-gray-50 sm:border-0`}
            >
                {getMenu(namespace).map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            'font-medium' +
                            (isActive ? ' text-accent1' : ' text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50')
                        }
                        onClick={handleNavClick}
                    >
                        {item.title}
                    </NavLink>
                ))}
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
