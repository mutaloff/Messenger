export const dateConvert = (timestamp) => {
    let date = new Date(timestamp);
    var midnightStamp = new Date;

    if (Date.now() - date < 86400_000) {
        if (new Date().getHours() > 5)
            if (timestamp > midnightStamp.setHours(0, 0, 0, 0)) {
                return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2)
            } else {
                return 'Вчера'
            }
        return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2)
    } else if ((Date.now() - date < 2 * 86400 * 1000)) {
        return 'Вчера'
    } else if ((Date.now() - date < 7 * 86400 * 1000)) {
        return weekDay(date.toString().substring(0, 3))
    } else {
        return ('0' + date.getDate()).slice(-2) + "." + ('0' + (date.getMonth() + 1)).slice(-2) + "." + ('0' + (date.getFullYear())).slice(-2)
    }
}


function weekDay(day) {
    switch (day) {
        case 'Mon':
            return 'Пн'
        case 'Tue':
            return 'Вт'
        case 'Wed':
            return 'Ср'
        case 'Thu':
            return 'Чт'
        case 'Fri':
            return 'Пт'
        case 'Sat':
            return 'Сб'
        case 'Sun':
            return 'Вс'
    }
}