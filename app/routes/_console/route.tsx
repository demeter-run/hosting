import { Outlet } from '@remix-run/react';
import Footer from '~/routes/_console/footer';
import Navbar from '~/routes/_console/navbar';

export default function Console() {
    return (
        <>
            <Navbar />
            <div className="bg-[#fafafa] dark:bg-gray-950 border-t border-b border-gray-50 dark:border-gray-600">
                <div className="wrapper min-h-[calc(100vh-102px)] py-10">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
