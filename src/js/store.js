/**
 * Initial spreadsheets state
 * Allow global access to store.setState and store.getState methods.
 */

(function initailState () {
    let defaultState = {
        stateInit: false,
        rows: 5,
        columns: 5,
        matrixData: [],
    };

    function getState () {
        return defaultState;
    };

    function setState (newState) {
        defaultState = newState;
    }

    window.store = {
        getState,
        setState
    }
})();