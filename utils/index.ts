export const numFormat = (views: any) => {
    let res
    if (views >= 10000) {
        res = Math.floor(views / 1000) / 10 + 'W+';
    } else if (views >= 1000) {
        res = Math.round(views / 100) / 10 + 'K+';
    } else {
        res = views;
    }
    return res;
}