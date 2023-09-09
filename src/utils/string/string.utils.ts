
export const stringConverter = (string: string) => {
    return string.toLowerCase().replace(/ /g, '-').trim()
}

export const stringConverter2 = (string: string) => {
    return string.toLowerCase().replace(/ /g, '-')
}
export const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-based, so we add 1
    const year = date.getFullYear()

    // Ensure day and month are displayed with two digits
    const formattedDay = String(day).padStart(2, '0')
    const formattedMonth = String(month).padStart(2, '0')

    return `${formattedDay}/${formattedMonth}/${year}`
}

