/**
 * Takes in a number and formats it into readable dollar amount. (5000 -> $5,000)
 * @param amount 
 * @returns String
 */
export function formatToDollar(amount: number): string {
    const formattedAmount: string = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
    return `${formattedAmount}`
}

/**
 * Takes in a dateSting and verify's if date is in YYYY-MM-DD format
 * @param dateStr 
 * @returns Boolean
 */
export function isValidDateFormat(dateStr: string): boolean {
    const DateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!DateFormatRegex.test(dateStr)) {
        return false;
    }

    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDay() === day;
}

/**
 * Returns current date as a string in YYYY-MM-DD format
 * Primary used to send data to the databse (start, end dates)
 * @returns Boolean
 */
export function getCurrentDate() {
    return new Date().toISOString().split("T")[0]
}