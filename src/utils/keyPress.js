export const keyPress = (e, handler) => {
    if (e.key === 'Enter') {
        handler(e);
    }
}