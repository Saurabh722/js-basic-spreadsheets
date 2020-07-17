
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

export default {
    "update-spreadsheet-data": updateSpreadsheetData,
    "update-spreadsheet-columns": updateSpreadsheetColumns,
    "update-spreadsheet-rows": updateSpreadsheetRows,
}