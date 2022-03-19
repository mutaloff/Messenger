export const checkSource = (url) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
        return true
    }
    img.onload = () => {
        return true
    };

    img.onerror = () => {
        return false
    };
}