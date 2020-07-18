import "./helper";
import "./store";
import contextMenuComponent from "../components/context-menu";
import template from "./template";
import * as utility from "./utility";

const view = {
    jsSpreadsheet: null,

    /**
     * update spreadsheet view.
     */
    render: () => {
        view.jsSpreadsheet.innerHTML = template.spreadsheetView();
    },

    /**
     * Highlight selected Column.
     * @param {Object} col - Selected Column index.
     */
    selectColumn: col => {
        qsa(`.js-spreadsheet-col__${col + 1}`).forEach(item => {
            item.classList.add("js-spreadsheet-col-selected");
        });
    },

    /**
     * Highlight selected Row.
     * @param {Object} row - Selected row index.
     */
    selectRow: row => {
        qs(`.js-spreadsheet-row_${row + 1}`).classList.add("js-spreadsheet-row-selected");
    },

    /**
     * De-select selected Row and Column.
     * @param {Object} row - Selected row index.
     * @param {Object} col - Selected column index.
     */
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

    /**
     * Iterate to array of Selected rows or columns and called given action.
     * @param {Object} action - Any view row column related action.
     */
    iterateSelected: (action) => {
        const appState = store.getState();
        if (!appState.selected.length) return;
        const min = Math.min(...appState.selected);
        const max = Math.max(...appState.selected);

        for (let i = min; i <= max; i++) {
            view[action](i, i);
        }
    },

    /**
     * bind Event Listener.
     */
	bind: () => {
		$live(".js-spreadsheet-cell", 'click', function () {
            const rowIndex = utility.getNumber(this.getAttribute("data-row"));
            const colIndex = utility.getNumber(this.getAttribute("data-col"));
            this.disabled = false;
            this.focus();
            store.publish("reset-selected", view.deSelectRowColumns);
        });

        $live(".js-spreadsheet-cell", 'blur', function (e) {
            const rowIndex = utility.getNumber(this.getAttribute("data-row"));
            const colIndex = utility.getNumber(this.getAttribute("data-col"));

            store.publish("update-spreadsheet-data", {
                rowIndex,
                colIndex,
                value: this.value,
            })
            this.disabled = true;
        });

        $live(".js-spreadsheet-col__index, .js-spreadsheet-row__index", 'contextmenu', function () {
            const rowIndex = utility.getNumber(this.getAttribute("data-row"));
            const colIndex = utility.getNumber(this.getAttribute("data-col"));

            store.publish("update-selected-row-column", {
                rowIndex,
                colIndex,
                handler: contextMenuComponent.handler
            });
        });

        $on(qs("[data-action=trigger-sort]"), "click", function () {
            store.publish("sort-column");
            view.render();
        });

        $live(".js-spreadsheet-head-menu-btn", 'click', function (e) {
            e.preventDefault();
            const colIndex = utility.getNumber(this.getAttribute("data-col"));
            const rowIndex = utility.getNumber(this.getAttribute("data-row"));

            contextMenuComponent.show(e, [".js-spreadsheet-head-menu-btn"], function () {
                store.publish("update-selected-row-column", {
                    rowIndex,
                    colIndex,
                    handler: contextMenuComponent.handler
                });
            });
        });

        $live(".js-spreadsheet-col__index", 'click', function (e) {
            const colIndex = utility.getNumber(this.getAttribute("data-col"));
            const appState = store.getState();

            if (e.shiftKey) {
                // If already row is selected
                if (appState.selectedRow !== -1) {
                    // de-select selected row
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
                store.publish("update-selected-columns", colIndex);
                view.iterateSelected("selectColumn");
            } else {
                // If already rows are selected
                if (appState.selectedRow !== -1 && appState.selected.length) {
                    // de-select all selected columns
                    view.iterateSelected("deSelectRowColumns");
                } else {
                    // de-select selected row
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
                store.publish("update-selected-column", colIndex);
                view.selectColumn(colIndex);
            }
        });

        $live(".js-spreadsheet-row__index", 'click', function (e) {
            const rowIndex = utility.getNumber(this.getAttribute("data-row"));
            const appState = store.getState();
            if (e.shiftKey) {
                // If already column is selected
                if (appState.selectedColumn !== -1) {
                    // de-select selected column
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
                store.publish("update-selected-rows", rowIndex);
                view.iterateSelected("selectRow");
            } else {
                // If already colums are selected
                if (appState.selectedColumn !== -1 && appState.selected.length) {
                    // de-select all selected columns
                    view.iterateSelected("deSelectRowColumns");
                } else {
                    // de-select selected column
                    store.publish("reset-selected", view.deSelectRowColumns);
                }
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

        $on(qs("[data-action=insert-left]"), "click", function () {
            store.publish("insert-left");
            view.render();
        });

        $on(qs("[data-action=insert-right]"), "click", function () {
            store.publish("insert-right");
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

        $on(qs("[data-action=delete-column]"), "click", function () {
            store.publish("delete-column");
            view.render();
        });

        $on(qs("[data-action=delete-columns]"), "click", function () {
            store.publish("delete-columns");
            view.render();
        });
    },

    /**
     * Initialize spreadsheet wrapper view
     * Update state with user given rows and columns
     */
    mainView: () => {
        const jsSpreadsheetApp = qs("#js-spreadsheet-app");
        const rows = utility.getNumber(jsSpreadsheetApp.getAttribute("data-rows"));
        const columns = utility.getNumber(jsSpreadsheetApp.getAttribute("data-columns"));

        if (rows) {
            store.publish("update-spreadsheet-rows", rows);
        }

        if (columns) {
            store.publish("update-spreadsheet-columns", columns);
        }

        jsSpreadsheetApp.innerHTML = template.initView();
        view.jsSpreadsheet = qs(".js-spreadsheet__container");
    },

    /**
     * Initialize spreadsheet main view and bind events
     */
    init: () => {
        view.mainView();
		view.render();
		view.bind();
    }
}

view.init();