type Request = {
    id: number;
    timestamp: string | number;
    status: string;
    host: string;
    request: string;
    message: string;
};

// TODO: Define if we need a separate id or we can use the timestamp as id

export function getRequests(): Promise<Request[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    timestamp: 1708582559000,
                    status: 'success',
                    host: 'demeter.host',
                    request: 'GET /',
                    message: 'GET / 200 3ms',
                },
                {
                    id: 2,
                    timestamp: 1708582559000,
                    status: 'success',
                    host: 'demeter.host',
                    request: 'GET /',
                    message: 'GET / 200 3ms',
                },
                {
                    id: 3,
                    timestamp: 1708582559000,
                    status: 'success',
                    host: 'demeter.host',
                    request: 'GET /',
                    message: 'GET / 200 3ms',
                },
                {
                    id: 4,
                    timestamp: 1708582559000,
                    status: 'success',
                    host: 'demeter.host',
                    request: 'GET /',
                    message: 'GET / 200 3ms',
                },
                {
                    id: 5,
                    timestamp: 1708582559000,
                    status: 'success',
                    host: 'demeter.host',
                    request: 'GET /',
                    message: 'GET / 200 3ms',
                },
            ]);
        }, 1000);
    });
}
