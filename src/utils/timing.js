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


export const timer = (seconds) => {
    if (seconds > 0) {
        let hours = ~~(seconds / 3600000)
        var minutes = new Date(seconds).toISOString().substr(14, 2);
        var secs = new Date(seconds).toISOString().substr(17, 2);
        return 'Осталось: ' + hours + ':' + minutes + ':' + secs
    }
    return 'Время вышло'
}