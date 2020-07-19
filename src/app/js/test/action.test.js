import actions from "./../action";
import store from "./../store";

describe("Scenario: js-spreadsheet actions.", () => {
    let state;
	let data;
    let result;

	it("It is a Object.", () => {
		expect(actions).toEqual(expect.any(Object));
    });
    
    describe("Scenario: 'update-spreadsheet-data' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-spreadsheet-data"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 0],
                    [0, 0]
                ]
            };

            data = {
                rowIndex: 1,
                colIndex: 1,
                value: "test"
            }

            actions["update-spreadsheet-data"](state, data);
        });

        it("Then: expect matrixData at 1, 1 position to be 'test'", () => {
            expect(state.matrixData[1][1]).toEqual("test");
        });
    });

    describe("Scenario: 'update-spreadsheet-columns' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-spreadsheet-columns"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                columns: 0
            };

            actions["update-spreadsheet-columns"](state, 3);
        });

        it("Then: expect columns should be updated", () => {
            expect(state.columns).toEqual(3);
        });
    });

    describe("Scenario: 'update-spreadsheet-rows' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-spreadsheet-rows"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                rows: 0
            };

            actions["update-spreadsheet-rows"](state, 3);
        });

        it("Then: expect rows should be updated", () => {
            expect(state.rows).toEqual(3);
        });
    });

    describe("Scenario: 'update-selected-column' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-selected-column"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: []
            };

            actions["update-selected-column"](state, 2);
        });

        it("Then: expect selected Column should be updated", () => {
            expect(state).toEqual({
                selectedColumn: 2,
                selectedRow: -1,
                selected: [2]
            });
        });
    });

    describe("Scenario: 'update-selected-row' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-selected-row"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: []
            };

            actions["update-selected-row"](state, 2);
        });

        it("Then: expect selected Row should be updated", () => {
            expect(state).toEqual({
                selectedColumn: -1,
                selectedRow: 2,
                selected: [2]
            });
        });
    });

    describe("Scenario: 'update-selected-columns' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-selected-columns"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: [2]
            };

            actions["update-selected-columns"](state, 3);
        });

        it("Then: expect update selected with selected columns", () => {
            expect(state).toEqual({
                selectedColumn: 3,
                selectedRow: -1,
                selected: [2, 3]
            });
        });
    });

    describe("Scenario: 'update-selected-rows' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-selected-rows"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: [2]
            };

            actions["update-selected-rows"](state, 3);
        });

        it("Then: expect update selected with selected rows", () => {
            expect(state).toEqual({
                selectedColumn: -1,
                selectedRow: 3,
                selected: [2, 3]
            });
        });
    });

    describe("Scenario: 'update-selected-row-column' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["update-selected-row-column"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: []
            };

            data = {
                rowIndex: 2,
                colIndex: 1,
                handler: _ => {}
            };

            spyOn(data, "handler");

            actions["update-selected-row-column"](state, data);
        });

        it("Then: expect update selected Row and Column", () => {
            expect(state).toEqual({
                selectedColumn: 1,
                selectedRow: 2,
                selected: []
            });

            expect(data.handler).toHaveBeenCalledWith(data.rowIndex, data.colIndex, state.selected);
        });
    });

    describe("Scenario: 'sort-column' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["sort-column"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    ["y", "b"],
                    ["z", "c"],
                    ["x", "a"]
                ],
                selectedColumn: 1
            };

            actions["sort-column"](state);
        });

        it("Then: expect matrixData should be sort according to selctedColumn", () => {
            expect(state.matrixData[0][1]).toEqual("a");
            expect(state.matrixData[1][1]).toEqual("b");
            expect(state.matrixData[2][1]).toEqual("c");
        });
    });

    describe("Scenario: 'reset-selected' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["reset-selected"]).toEqual(expect.any(Function));
        });

        let win;

        beforeEach(() => {
            state = {
                selectedColumn: -1,
                selectedRow: -1,
                selected: []
            };

            win = {
                handler: () => {}
            };

            spyOn(win, "handler");

            actions["reset-selected"](state, win.handler);
        });

        it("Then: expect handler should be called", () => {
            expect(win.handler).toHaveBeenCalledWith(state.selectedColumn, state.selectedRow);
        });
    });

    describe("Scenario: 'insert-above' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["insert-above"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [1, 2]
                ],
                rows: 2,
                columns: 2,
                selectedRow: 1
            };

            actions["insert-above"](state);
        });

        it("Then: expect matrixData should insert 1 row up to the selected Row", () => {
            expect(state.matrixData[0]).toEqual([0, 1]);
            expect(state.matrixData[2]).toEqual([1, 2]);
            expect(state.matrixData.length).toEqual(3);
            expect(state.rows).toEqual(3);
        });
    });

    describe("Scenario: 'insert-below' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["insert-below"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [2, 3]
                ],
                rows: 2,
                columns: 2,
                selectedRow: 1
            };

            actions["insert-below"](state);
        });

        it("Then: expect matrixData should insert 1 row down to the selected Row", () => {
            expect(state.matrixData[0]).toEqual([0, 1]);
            expect(state.matrixData[1]).toEqual([2, 3]);
            expect(state.matrixData.length).toEqual(3);
            expect(state.rows).toEqual(3);
        });
    });

    describe("Scenario: 'insert-left' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["insert-left"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [2, 3]
                ],
                rows: 2,
                columns: 2,
                selectedColumn: 1
            };

            actions["insert-left"](state);
        });

        it("Then: expect matrixData should insert 1 column left to the selected Column", () => {
            expect(state.matrixData[0][0]).toEqual(0);
            expect(state.matrixData[0][2]).toEqual(1);
            expect(state.matrixData[1][0]).toEqual(2);
            expect(state.matrixData[1][2]).toEqual(3);
            expect(state.matrixData[0].length).toEqual(3);
            expect(state.columns).toEqual(3);
        });
    });

    describe("Scenario: 'insert-right' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["insert-right"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [2, 3]
                ],
                rows: 2,
                columns: 2,
                selectedColumn: 1
            }

            actions["insert-right"](state);
        });

        it("Then: expect matrixData should insert 1 column Right to the selected Column", () => {
            expect(state.matrixData[0][0]).toEqual(0);
            expect(state.matrixData[0][1]).toEqual(1);
            expect(state.matrixData[1][0]).toEqual(2);
            expect(state.matrixData[1][1]).toEqual(3);
            expect(state.matrixData[0].length).toEqual(3);
            expect(state.columns).toEqual(3)
        });
    });

    describe("Scenario: 'delete-row' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["delete-row"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [1, 2]
                ],
                rows: 2,
                columns: 2,
                selectedRow: 0
            };

            actions["delete-row"](state);
        });

        it("Then: expect Delete 1 row and reset select state to default", () => {
            expect(state.matrixData[0]).toEqual([1, 2]);
            expect(state.matrixData.length).toEqual(1);
            expect(state.rows).toEqual(1);
            expect(state.selected).toEqual([]);
            expect(state.selectedRow).toEqual(-1);
            expect(state.selectedColumn).toEqual(-1);
        });
    });

    describe("Scenario: 'delete-rows' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["delete-rows"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1],
                    [2, 3],
                    [4, 5],
                    [6, 7]
                ],
                rows: 4,
                columns: 2,
                selected: [1, 2]
            };

            actions["delete-rows"](state);
        });

        it("Then: expect Delete selected rows and reset select state to default", () => {
            expect(state.matrixData[0]).toEqual([0, 1]);
            expect(state.matrixData[1]).toEqual([6, 7]);
            expect(state.matrixData.length).toEqual(2);
            expect(state.rows).toEqual(2);
            expect(state.selected).toEqual([]);
            expect(state.selectedRow).toEqual(-1);
            expect(state.selectedColumn).toEqual(-1);
        });
    });

    describe("Scenario: 'delete-column' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["delete-column"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1, 3],
                    [4, 5, 6]
                ],
                rows: 2,
                columns: 3,
                selectedColumn: 1
            };

            actions["delete-column"](state);
        });

        it("Then: expect Delete 1 column and reset select state to default", () => {
            expect(state.matrixData[0]).toEqual([0, 3]);
            expect(state.matrixData[1]).toEqual([4, 6]);
            expect(state.matrixData[0].length).toEqual(2);
            expect(state.columns).toEqual(2);
            expect(state.selected).toEqual([]);
            expect(state.selectedRow).toEqual(-1);
            expect(state.selectedColumn).toEqual(-1);
        });
    });

    describe("Scenario: 'delete-columns' is an action", () => {
        it("It is a Function.", () => {
            expect(actions["delete-columns"]).toEqual(expect.any(Function));
        });

        beforeEach(() => {
            state = {
                matrixData: [
                    [0, 1, 3, 4],
                    [5, 6, 7, 8]
                ],
                rows: 2,
                columns: 4,
                selected: [1, 2]
            };

            actions["delete-columns"](state);
        });

        it("Then: expect Delete selected columns and reset select state to default", () => {
            expect(state.matrixData[0]).toEqual([0, 4]);
            expect(state.matrixData[1]).toEqual([5, 8]);
            expect(state.matrixData[0].length).toEqual(2);
            expect(state.columns).toEqual(2);
            expect(state.selected).toEqual([]);
            expect(state.selectedRow).toEqual(-1);
            expect(state.selectedColumn).toEqual(-1);
        });
    });
});
