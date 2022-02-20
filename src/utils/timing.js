export const getTiming = (time) => {
    if (time / 1000 < 60) {
        return 'только что'
    } else if (time / 1000 < 3600) {
        return `${~~(time / 1000 / 60)} минут назад`
    } else if (time / 1000 < 86400) {
        return `${~~(time / 1000 / 60 / 60)} часов назад`
    } else
        return `${~~(time / 1000 / 60 / 60 / 24)} дней назад`
}