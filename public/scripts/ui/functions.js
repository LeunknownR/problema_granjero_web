export const waitFor = (seconds) => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, seconds*1000);
    });
}