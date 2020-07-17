import * as utility from "./utility";

/**
 * Initialize the spreadsheet view on the page.
 * @returns {String} spreadsheet View String.
 */
function spreadsheetView () {
    const appState = store.getState();
    let excelString = "";

    const getCellData = (i, j) => appState.matrixData[i][j] || "";

    for (let i = 0; i <= appState.rows; i++) {
        let rowView = "";

        if (!appState.stateInit && i > 0) {
            appState.matrixData[i - 1] = new Array(appState.columns);
        }

        for (let j = 0; j <= appState.columns; j++) {
            if (i === 0 && j === 0) {
                rowView += `<a class="js-spreadsheet-col js-spreadsheet-origin"></a>`;
            } else if (i === 0) {
                rowView += `<a class="js-spreadsheet-col js-spreadsheet-col__index" data-col="${j - 1}">${utility.getColName(j-1)}</a>`;
            } else if (j === 0) {
                rowView += `<a class="js-spreadsheet-col js-spreadsheet-row__index" data-row="${i - 1}">${i}</a>`;
            } else {
                rowView += `<a class="js-spreadsheet-col"><textarea class="js-spreadsheet-cell" disabled data-row="${i - 1}" data-col="${j - 1}">${getCellData(i - 1, j - 1)}</textarea></a>`;
            }
        }

        excelString += `<div class="js-spreadsheet-row row-container_${i}">${rowView}</div>`;
    }

    appState.stateInit = true;
    return excelString;
}

export default spreadsheetView;