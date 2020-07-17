import * as utility from "./utility";

function updateSpreadsheetData (state, data) {
    state.matrixData[data.rowIndex][data.colIndex] = data.value;
    store.setState(state);
}

function updateSpreadsheetColumns (state, columns) {
    state.columns = columns;
    store.setState(state);
}

function updateSpreadsheetRows (state, rows) {
    state.rows = rows;
    store.setState(state);
}

function updateSelectedRowAndColumn (state, data) {
    state.selectedColumn = data.colIndex;
    state.selectedRow = data.rowIndex;
    store.setState(state);
    data.contextMenuHandler(data.rowIndex, data.colIndex);
}

function sortColumns (state) {
    state.matrixData.sort(utility.sort(state.selectedColumn));
    store.setState(state);
}

export default {
    "update-spreadsheet-data": updateSpreadsheetData,
    "update-spreadsheet-columns": updateSpreadsheetColumns,
    "update-spreadsheet-rows": updateSpreadsheetRows,
    "update-selected-row-column": updateSelectedRowAndColumn,
    "sort-column": sortColumns
}