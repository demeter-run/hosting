import { NavLink, Outlet, useParams } from '@remix-run/react';
import { BoltIcon, LogIcon } from '~/fragments/icons';

export default function Monitor() {
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
            name: 'Logs',
            to: `/${namespace}/monitor/logs`,
            icon: <LogIcon className="w-4" />,
        },
        {
            name: 'Activity',
            to: `/${namespace}/monitor/activity`,
            icon: <BoltIcon className="w-4" />,
        },
    ];
}
