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

function updateSelectedColumns (state, colIndex) {
    state.selectedColumn = colIndex;
    state.selectedRow = -1;
    state.selected.push(colIndex);
    store.setState(state);
}

function updateSelectedRow (state, rowIndex) {
    state.selectedColumn = -1;
    state.selectedRow = rowIndex;
    state.selected = [rowIndex];
    store.setState(state);
}

function updateSelectedRows (state, rowIndex) {
    state.selectedColumn = -1;
    state.selectedRow = rowIndex;
    state.selected.push(rowIndex);
    store.setState(state);
}

function updateSelectedRowAndColumn (state, data) {
    state.selectedColumn = data.colIndex;
    state.selectedRow = data.rowIndex;
    store.setState(state);
    data.handler(data.rowIndex, data.colIndex, state.selected);
}

function sortColumns (state) {
    state.matrixData.sort(utility.sort(state.selectedColumn));
    store.setState(state);
}

function resetState (state) {
    state.selectedRow = -1;
    state.selectedColumn = -1;
    state.selected = [];
    store.setState(state);
}

function resetSelected (state, handler) {
    handler(state.selectedRow, state.selectedColumn);
    resetState(state);
}

function deleteRow (state) {
    state.matrixData.splice(state.selectedRow, 1);
    state.selected = [];
    --state.rows;
    resetState(state);
}

function deleteRows (state) {
    if (!state.selected.length) return;
    const min = Math.min(...state.selected);
    const max = Math.max(...state.selected);

    state.matrixData.splice(min, max);
    state.rows = state.matrixData.length;
    resetState(state);
}

function deleteColumn (state, toIdx, fromIdx=1) {
    const selectedColumn = typeof toIdx === "number" ? toIdx : state.selectedColumn;

    for (let i = 0; i < state.rows; i++) {
        state.matrixData[i].splice(selectedColumn, fromIdx);
    }

    state.columns =  state.matrixData[0].length;
    resetState(state);
}

function deleteColumns (state) {
    if (!state.selected.length) return;
    const toIdx = Math.min(...state.selected);
    const fromIdx = Math.max(...state.selected);

    deleteColumn(state, toIdx, fromIdx);
}

function insertAbove (state) {
    if (state.rows < state.maxRows) {
        state.matrixData.splice(state.selectedRow, 0, new Array(state.columns));
        ++state.rows;
        store.setState(state);
    } else {
        utility.showAlert("Number of Rows should me less then 300");
    }
}

function insertBelow (state) {
    if (state.rows < state.maxRows) {
        state.matrixData.splice(state.selectedRow + 1, 0, new Array(state.columns));
        ++state.rows;
        store.setState(state);
    } else {
        utility.showAlert("Number of Rows should me less then 300");
    }
}

function insertLeft (state) {
    if (state.columns < state.maxColumns) {
        for (let i = 0; i < state.rows; i++) {
            state.matrixData[i].splice(state.selectedColumn, 0, []);
        }

        ++state.columns;
        store.setState(state);
    } else {
        utility.showAlert("Number of Columns should me less then 100");
    }
}

function insertRight (state) {
    if (state.columns < state.maxColumns) {
        for (let i = 0; i < state.rows; i++) {
            state.matrixData[i].splice(state.selectedColumn + 1, 0, []);
        }

        ++state.columns;
        store.setState(state);
    } else {
        utility.showAlert("Number of Columns should me less then 100");
    }
}

export default {
    "update-spreadsheet-data": updateSpreadsheetData,
    "update-spreadsheet-columns": updateSpreadsheetColumns,
    "update-spreadsheet-rows": updateSpreadsheetRows,

    "update-selected-column": updateSelectedColumn,
    "update-selected-columns": updateSelectedColumns,
    "update-selected-row": updateSelectedRow,
    "update-selected-rows": updateSelectedRows,
    "update-selected-row-column": updateSelectedRowAndColumn,

    "sort-column": sortColumns,
    "reset-selected": resetSelected,

    "insert-above": insertAbove,
    "insert-below": insertBelow,
    "insert-left": insertLeft,
    "insert-right": insertRight,

    "delete-row": deleteRow,
    "delete-rows": deleteRows,
    "delete-column": deleteColumn,
    "delete-columns": deleteColumns
}