export const parseDate = (date: Date) => {
    return date.toLocaleString().split(',')[0] ?? ''
}