import "./helper";
import "./store";
import spreadsheetView from "./template";

const view = {
    jsspreadsheet: qs(".js-spreadsheet__container"),
    render: () => {
        view.jsspreadsheet.innerHTML = spreadsheetView();
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
	},
    init: () => {
		view.render();
		view.bind();
    }
}

view.init();