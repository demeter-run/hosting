import { ClientOnly } from 'remix-utils/client-only';

export function formatDate(date: Date, dateStyle: 'full' | 'long' | 'medium' | 'short' = 'full', timeStyle?: 'full' | 'long' | 'medium' | 'short') {
    return new Intl.DateTimeFormat('en-US', { dateStyle, timeStyle }).format(date);
}

export function formatDateClient(
    date: Date,
    dateStyle: 'full' | 'long' | 'medium' | 'short' = 'full',
    timeStyle?: 'full' | 'long' | 'medium' | 'short',
) {
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle, timeStyle }).format(date);
    return <ClientOnly>{() => <>{formattedDate}</>}</ClientOnly>;
}
