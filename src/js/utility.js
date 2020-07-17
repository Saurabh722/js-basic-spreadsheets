/**
 * Hardcode data contains columns index.
 */
const colHead = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const columns = colHead.length;

export function getColName (index) {
    if (index < colHead.length) return colHead[index];
    const newIndex = (index) % util.columns;
    const repeatCount = Math.ceil((index + 1) / util.columns);
    let colName = "";
    for (let i = 0; i < repeatCount; i++) {
        colName += colHead[newIndex];
    }
    return colName;
}