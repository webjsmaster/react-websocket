export const convertTimstamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()

    const month = date.getMonth()


    const currentDate = date.getDate()

    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    return { time: hours + ':' + minutes.substr(-2), date: currentDate + '.' + month + '.' + year }
}
