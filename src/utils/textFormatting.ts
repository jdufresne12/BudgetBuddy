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
