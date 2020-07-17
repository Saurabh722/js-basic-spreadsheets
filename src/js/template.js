import * as utility from "./utility";

/**
 * Initialize the spreadsheets view on the page.
 * @returns {String} spreadsheets View String.
 */
function spreadsheetsView () {
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
                rowView += `<a class="js-spreadsheets-col js-spreadsheets-origin"></a>`;
            } else if (i === 0) {
                rowView += `<a class="js-spreadsheets-col js-spreadsheets-col__index">${utility.getColName(j-1)}</a>`;
            } else if (j === 0) {
                rowView += `<a class="js-spreadsheets-col js-spreadsheets-row__index">${i}</a>`;
            } else {
                rowView += `<a class="js-spreadsheets-col"><textarea class="js-spreadsheets-cell" disabled>${getCellData(i - 1, j - 1)}</textarea></a>`;
            }
        }

        excelString += `<div class="js-spreadsheets-row row-container_${i}">${rowView}</div>`;
    }

    appState.stateInit = true;
    return excelString;
}

export default spreadsheetsView;