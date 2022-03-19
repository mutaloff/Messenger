export const importanceConvert = (importance) => {
    switch (importance.toString()) {
        case '0':
            return 'Игнор'
        case '1':
            return 'Не важно'
        case '3':
            return 'Важно'
        case '4':
            return 'Срочно'
        default:
            return 'Стандартно'
    }
}