export function formatDate(date: Date, dateStyle: 'full' | 'long' | 'medium' | 'short' = 'full', timeStyle?: 'full' | 'long' | 'medium' | 'short') {
    return new Intl.DateTimeFormat('en-US', { dateStyle, timeStyle }).format(date);
}
