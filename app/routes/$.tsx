import { Link } from '@remix-run/react';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="max-w-lg mx-auto">
                <img
                    src={`/assets/illus/not-found.webp`}
                    alt="Demeter devs searching for a page that went on an adventure"
                    className="rounded-full shadow-xl"
                />
            </div>
            <h1 className="text-7xl font-semibold mt-12">Not found</h1>
            <p className="text-2xl mt-4 max-w-xl text-center font-light">
                We are sorry, the page you were looking for seems to have gone on an adventure. But no worries, our team is searching for it.
            </p>
            <Link to="/" className="btn-secondary mt-10">
                GO HOME
            </Link>
        </div>
    );
}
