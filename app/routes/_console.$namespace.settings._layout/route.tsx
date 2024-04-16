import { NavLink, Outlet, useParams } from '@remix-run/react';
import { GasIcon, GlobeAltIcon, GlobeAmericasIcon } from '~/fragments/icons';

export default function Settings() {
    const namespace = useParams().namespace;

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <ul className="side-menu-wrapper">
                {getMenu(namespace).map(item => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => 'side-menu-item-base ' + (isActive ? 'side-menu-item-active' : 'side-menu-item-inactive')}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="content-area-wrapper">
                <Outlet />
            </div>
        </div>
    );
}

function getMenu(namespace: string | undefined) {
    return [
        {
            name: 'Providers',
            to: `/${namespace}/settings/providers`,
            icon: <GlobeAmericasIcon className="w-4" />,
        },
        {
            name: 'Namespace',
            to: `/${namespace}/settings/namespace`,
            icon: <GlobeAltIcon className="w-4" />,
        },
        {
            name: 'Gas',
            to: `/${namespace}/settings/gas`,
            icon: <GasIcon className="w-4" />,
        },
    ];
}
