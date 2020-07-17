import "./helper";
import "./store";
import spreadsheetsView from "./template";

const view = {
    jsSpreadSheets: qs(".js-spreadsheets__container"),
    render: () => {
        view.jsSpreadSheets.innerHTML = spreadsheetsView();
    },
    init: () => {
        view.render();
    }
}

view.init();