export const checkSource = (url) => {
    let regex = /(https?:\/\/.*\.(?:png|jpg))/i
    if (url && url.match(regex)) {
        return true
    }
    return false;
}
