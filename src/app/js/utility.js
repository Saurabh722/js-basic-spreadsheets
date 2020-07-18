/**
 * Hardcode data contains columns index.
 */
const colHead = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const columns = colHead.length;

export function getColName(index) {
    if (index < colHead.length) return colHead[index];
    const newIndex = (index) % columns;
    const repeatCount = Math.ceil((index + 1) / columns);
    let colName = "";
    for (let i = 0; i < repeatCount; i++) {
        colName += colHead[newIndex];
    }
    return colName;
}

export function sort(key, order = 'asc') {
    return function innerSort(a, b) {
        if (typeof a[key] === "undefined" || typeof b[key] === "undefined") {
            if (typeof a[key] !== "undefined") {
                return -1;
            }
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}