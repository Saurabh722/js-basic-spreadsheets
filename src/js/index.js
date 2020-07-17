/*----------------------------------------------DATA----------------------------------------------*/
/**
 * Hardcode data contains cards details.
 */
const colHead = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const appState = {
    stateInit: false,
    rows: 5,
	columns: 5,
	matrixData: [],
};

/*-----------------------------------------------helper Lib---------------------------------------------*/

(function bindEventWrapper() {
    // Get element by CSS selector:
    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    // addEventListener wrapper:
    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };
})();

/*-----------------------------------------------Utility---------------------------------------------*/

const util = {
    columns: colHead.length,
    getColName: index => {
        if (index < colHead.length) return colHead[index];
        const newIndex = (index) % util.columns;
        const repeatCount = Math.ceil((index + 1) / util.columns);
        let colName = "";
        for (let i = 0; i < repeatCount; i++) {
            colName += colHead[newIndex];
        }
        return colName;
    }
}

/*-----------------------------------------------View---------------------------------------------*/

const view = {
    jsSpreadSheets: qs(".js-spreadsheets__container"),
    getCellData: (i, j) => appState.matrixData[i][j] || "",
    getViewString: _ => {
        let excelString = "";
        for (let i = 0; i <= appState.rows; i++) {
            let rowView = "";

            if (!appState.stateInit && i > 0) {
                appState.matrixData[i - 1] = new Array(appState.columns);
            }

            for (let j = 0; j <= appState.columns; j++) {
                if (i === 0 && j === 0) {
                    rowView += `<a class="js-spreadsheets-col js-spreadsheets-origin"></a>`;
                } else if (i === 0) {
                    rowView += `<a class="js-spreadsheets-col js-spreadsheets-col__index">${util.getColName(j-1)}</a>`;
                } else if (j === 0) {
                    rowView += `<a class="js-spreadsheets-col js-spreadsheets-row__index">${i}</a>`;
                } else {
                    rowView += `<a class="js-spreadsheets-col"><textarea class="js-spreadsheets-cell" disabled></textarea></a>`;
                }
            }

            excelString += `<div class="js-spreadsheets-row row-container_${i}">${rowView}</div>`;
        }

        appState.stateInit = true;
        return excelString;
    },
    render: () => {
        view.jsSpreadSheets.innerHTML = view.getViewString();
    },
    init: () => {
        view.render();
    }
}

view.init();