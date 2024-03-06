import { NavLink, Outlet } from '@remix-run/react';
import { BoltIcon, CurrencyDollarIcon, LogIcon } from '~/fragments/icons';

export default function Monitor() {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <ul className="side-menu-wrapper">
                {SIDE_NAV.map(item => (
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

const SIDE_NAV = [
    {
        name: 'Logs',
        to: '/project/monitor/logs',
        icon: <LogIcon className="w-4" />,
    },
    {
        name: 'Requests',
        to: '/project/monitor/requests',
        icon: <BoltIcon className="w-4" />,
    },
    {
        name: 'Cost',
        to: '/project/monitor/cost',
        icon: <CurrencyDollarIcon className="w-4" />,
    },
];
