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

function updateSelectedColumn (state, colIndex) {
    state.selectedColumn = colIndex;
    state.selectedRow = -1;
    state.selected = [colIndex];
    store.setState(state);
}

function updateSelectedRow (state, rowIndex) {
    state.selectedColumn = -1;
    state.selectedRow = rowIndex;
    state.selected = [rowIndex];
    store.setState(state);
}

function updateSelectedRowAndColumn (state, data) {
    state.selectedColumn = data.colIndex;
    state.selectedRow = data.rowIndex;
    store.setState(state);
    data.contextMenuHandler(data.rowIndex, data.colIndex, state.selected);
}

function sortColumns (state) {
    state.matrixData.sort(utility.sort(state.selectedColumn));
    store.setState(state);
}

function resetSelected (state, handler) {
    handler(state.selectedRow, state.selectedColumn);
    state.selectedRow = -1;
    state.selectedColumn = -1;
    state.selected = [];
    store.setState(state);
}

export default {
    "update-spreadsheet-data": updateSpreadsheetData,
    "update-spreadsheet-columns": updateSpreadsheetColumns,
    "update-spreadsheet-rows": updateSpreadsheetRows,
    "update-selected-row-column": updateSelectedRowAndColumn,
    "update-selected-column": updateSelectedColumn,
    "update-selected-row": updateSelectedRow,
    "sort-column": sortColumns,
    "reset-selected": resetSelected
}