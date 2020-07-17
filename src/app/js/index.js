import "./helper";
import "./store";
import contextMenuHandler from "../components/context-menu";
import spreadsheetView from "./template";

const view = {
    jsspreadsheet: qs(".js-spreadsheet__container"),
    render: () => {
        view.jsspreadsheet.innerHTML = spreadsheetView();
    },
    sortColumn: () => {
        store.publish("update-selected-row-column");
        view.render();
    },
    resetSelectedState: _ => {
        appState.selectedRow = -1;
        appState.selectedColumn = -1;
        appState.selected = [];
    },
    selectColumn: col => {
        console.log(col);
        qsa(`.js-spreadsheet-col__${col + 1}`).forEach(item => {
            item.classList.add("js-spreadsheet-col-selected");
        });
    },
    selectRow: row => {
        qs(`.js-spreadsheet-row_${row + 1}`).classList.add("js-spreadsheet-row-selected");
    },
    deSelectRowColumns: (row, col) => {
        if (col !== -1) {
            qsa(`.js-spreadsheet-col__${col + 1}`).forEach(item => {
                item.classList.remove("js-spreadsheet-col-selected");
            });
        }

        if (row !== -1) {
            qs(`.js-spreadsheet-row_${row + 1}`).classList.remove("js-spreadsheet-row-selected");
        }
    },
    viewAction: action => {
        if (!appState.selected.length) return;
        const min = Math.min(...appState.selected);
        const max = Math.max(...appState.selected);

        for (let i = min; i <= max; i++) {
            if (action === "deSelectRowColumns") {
                view.deSelectRowColumns(appState.selectedRow , i);
                view.deSelectRowColumns(i, appState.selectedColumn);
            } else {
                view[action](i);
            }
        }
    },
    insertAbove: _ => { 
        appState.matrixData.splice(appState.selectedRow, 0, new Array(appState.columns));
        ++appState.rows;
        view.render();
    },
    insertBelow: _ => {
        appState.matrixData.splice(appState.selectedRow + 1, 0, new Array(appState.columns));
        ++appState.rows;
        view.render();
    },
    deleteRow: _ => {
        appState.matrixData.splice(appState.selectedRow, 1);
        --appState.rows;
        view.render();
    },
    insertLeft: _ => {
        for (let i = 0; i < appState.rows; i++) {
            appState.matrixData[i].splice(appState.selectedColumn, 0, []);
        }

        ++appState.columns;
        view.render();
    },
    insertRight: _ => {
        for (let i = 0; i < appState.rows; i++) {
            appState.matrixData[i].splice(appState.selectedColumn + 1, 0, []);
        }

        ++appState.columns;
        view.render();
    },
    deleteColumn: _ => {
        for (let i = 0; i < appState.rows; i++) {
            appState.matrixData[i].splice(appState.selectedColumn, 1);
        }

        --appState.columns;
        view.render();
    },
	bind: () => {
		$live(".js-spreadsheet-cell", 'click', function () {
            this.disabled = false;
            this.focus();
        });

        $live(".js-spreadsheet-cell", 'blur', function () {
            const rowIndex = this.getAttribute("data-row");
            const colIndex = this.getAttribute("data-col");

            store.publish("update-spreadsheet-data", {
                rowIndex,
                colIndex,
                value: this.value,
            })
            this.disabled = true;
        });

        $live(".js-spreadsheet-col__index, .js-spreadsheet-row__index", 'contextmenu', function () {
            const rowIndex = this.getAttribute("data-row");
            const colIndex = this.getAttribute("data-col");

            store.publish("update-selected-row-column", {
                rowIndex,
                colIndex,
                contextMenuHandler
            });
        });

        $on(qs("[data-action=trigger-sort]"), "click", view.sortColumn);

        $live(".js-spreadsheet-col__index", 'click', function (e) {
            const colIndex = parseInt(this.getAttribute("data-col"));
            store.publish("reset-selected", view.deSelectRowColumns);
            store.publish("update-selected-column", colIndex);
            view.selectColumn(colIndex);
        });

        $live(".js-spreadsheet-row__index", 'click', function (e) {
            const rowIndex = parseInt(this.getAttribute("data-row"));
            store.publish("reset-selected", view.deSelectRowColumns);
            store.publish("update-selected-row", rowIndex);
            view.selectRow(rowIndex);
        });
	},
    init: () => {
		view.render();
		view.bind();
    }
}

view.init();