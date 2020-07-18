import "./helper";
import "./store";
import contextMenuHandler from "../components/context-menu";
import spreadsheetView from "./template";

const view = {
    jsspreadsheet: qs(".js-spreadsheet__container"),
    render: () => {
        view.jsspreadsheet.innerHTML = spreadsheetView();
    },
    selectColumn: col => {
        qsa(`.js-spreadsheet-col__${col + 1}`).forEach(item => {
            item.classList.add("js-spreadsheet-col-selected");
        });
    },
    selectRow: row => {
        qs(`.js-spreadsheet-row_${row + 1}`).classList.add("js-spreadsheet-row-selected");
    },
    deSelectRowColumns: (row, col) => {
        if (typeof col === "number" && col !== -1) {
            qsa(`.js-spreadsheet-col__${col + 1}`).forEach(item => {
                item.classList.remove("js-spreadsheet-col-selected");
            });
        }

        if (typeof row === "number" && row !== -1) {
            qs(`.js-spreadsheet-row_${row + 1}`).classList.remove("js-spreadsheet-row-selected");
        }
    },
    iterateSelected: (action) => {
        const appState = store.getState();
        if (!appState.selected.length) return;
        const min = Math.min(...appState.selected);
        const max = Math.max(...appState.selected);

        for (let i = min; i <= max; i++) {
            view[action](i);
        }
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

        $on(qs("[data-action=trigger-sort]"), "click", function () {
            store.publish("sort-column");
            view.render();
        });

        $live(".js-spreadsheet-col__index", 'click', function (e) {
            const colIndex = parseInt(this.getAttribute("data-col"));
            if (e.shiftKey) {
                if (store.getState().selectedRow !== -1) {
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
                store.publish("update-selected-columns", colIndex);
                view.iterateSelected("selectColumn");
            } else {
                store.publish("reset-selected", view.deSelectRowColumns);
                store.publish("update-selected-column", colIndex);
                view.selectColumn(colIndex);
            }
        });

        $live(".js-spreadsheet-row__index", 'click', function (e) {
            const rowIndex = parseInt(this.getAttribute("data-row"));
            if (e.shiftKey) {
                if (store.getState().selectedColumn !== -1) {
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
                store.publish("update-selected-rows", rowIndex);
                view.iterateSelected("selectRow");
            } else {
                store.publish("reset-selected", view.deSelectRowColumns);
                store.publish("update-selected-row", rowIndex);
                view.selectRow(rowIndex);
            }
        });

        $on(qs("[data-action=insert-above]"), "click", function () {
            store.publish("insert-above");
            view.render();
        });

        $on(qs("[data-action=insert-below]"), "click", function () {
            store.publish("insert-below");
            view.render();
        });

        $on(qs("[data-action=delete-row]"), "click", function () {
            store.publish("delete-row");
            view.render();
        });

        $on(qs("[data-action=delete-rows]"), "click", function () {
            store.publish("delete-rows");
            view.render();
        });

        $on(qs("[data-action=insert-left]"), "click", function () {
            store.publish("insert-left");
            view.render();
        });

        $on(qs("[data-action=insert-right]"), "click", function () {
            store.publish("insert-right");
            view.render();
        });

        $on(qs("[data-action=delete-column]"), "click", function () {
            store.publish("delete-column");
            view.render();
        });

        $on(qs("[data-action=delete-columns]"), "click", function () {
            store.publish("delete-columns");
            view.render();
        });
	},
    init: () => {
		view.render();
		view.bind();
    }
}

view.init();