import actions from "./action";

/**
 * Initial spreadsheet state
 * Allow global access to store.setState and store.getState methods.
 */

(function initailState () {
    let defaultState = {
        stateInit: false,
        rows: 20,
        columns: 20,
        selectedRow: -1,
        selectedColumn: -1,
        matrixData: [],
        selected: [],
    };

    function getState () {
        return defaultState;
    };

    function setState (newState) {
        defaultState = newState;
    }

    function publish (action, data) {
        actions[action](defaultState, data);
    }

    window.store = {
        getState,
        setState,
        publish
    }
})();