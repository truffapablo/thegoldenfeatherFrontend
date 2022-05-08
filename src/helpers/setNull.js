
export const setNull = (obj) => {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key) || obj[key] === null || obj[key] === undefined || obj[key] === '') {
            obj[key] = null;
        }
    }

    return obj;
}