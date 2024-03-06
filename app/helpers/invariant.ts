// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function invariant(condition: any, message: string, statusCode = 500) {
    if (!condition) {
        throw new Response(null, {
            status: statusCode,
            statusText: message,
        });
    }
}
