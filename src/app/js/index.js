import "./helper";
import "./store";
import contextMenuHandler from "../components/context-menu";
import spreadsheetView from "./template";

const view = {
    jsspreadsheet: qs(".js-spreadsheet__container"),
    render: () => {
        view.jsspreadsheet.innerHTML = spreadsheetView();
    },
    sortColumn: _=> {
        store.publish("sort-column");
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
	},
    init: () => {
		view.render();
		view.bind();
    }
}

view.init();