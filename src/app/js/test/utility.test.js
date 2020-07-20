import * as utility from "./../utility";

describe("Scenario: utility methods.", () => {
	it("It is a Object.", () => {
		expect(utility).toEqual(expect.any(Object));
	});
	
	describe("Scenario: Utility test getColName", () => {
		it("It is a Function.", () => {
			expect(utility.getColName).toEqual(expect.any(Function));
		});

		describe("When: getColName is called without index", () => {
			it("Then: It returns empty string", () => {
				expect(utility.getColName()).toEqual("");
			});
		});

		describe("When: getColName is called with 0th index", () => {
			it("Then: It returns 'A' string", () => {
				expect(utility.getColName(0)).toEqual("A");
			});
		});

		describe("When: getColName is called with 5th index", () => {
			it("Then: It returns 'F' string", () => {
				expect(utility.getColName(5)).toEqual("F");
			});
		});

		describe("When: getColName is called with 30th index", () => {
			it("Then: It returns 'EE' string", () => {
				expect(utility.getColName(30)).toEqual("EE");
			});
		});

		describe("When: getColName is called with 55th index", () => {
			it("Then: It returns 'DDD' string", () => {
				expect(utility.getColName(55)).toEqual("DDD");
			});
		});
	});
	
	describe("Scenario: Utility test getNumber", () => {
		it("It is a Function.", () => {
			expect(utility.getNumber).toEqual(expect.any(Function));
		});

		describe("When: getNumber is called without param", () => {
			it("Then: It returns -1", () => {
				expect(utility.getNumber()).toEqual(-1);
			});
		});

		describe("When: getColName is called with 0", () => {
			it("Then: It returns 0", () => {
				expect(utility.getNumber(0)).toEqual(0);
			});
		});

		describe("When: getColName is called with '0' as string", () => {
			it("Then: It returns 0", () => {
				expect(utility.getNumber("0")).toEqual(0);
			});
		});

		describe("When: getColName is called with '5' as string", () => {
			it("Then: It returns 5", () => {
				expect(utility.getNumber("5")).toEqual(5);
			});
		});

		describe("When: getColName is called with NaN", () => {
			it("Then: It returns -1", () => {
				expect(utility.getNumber(NaN)).toEqual(-1);
			});
		});
	});
	
	describe("Scenario: Utility test sort", () => {
		let array;

		it("It is a Function.", () => {
			expect(utility.sort).toEqual(expect.any(Function));
		});
		
		describe("When: ascending order sort is called with key=1", () => {
			beforeEach(() => {
				array = [
					["y", "b"],
					["z", "c"],
					["x", "a"]
				];

				array.sort(utility.sort(1));
			});
			it("Then: It sort the array at 1 column", () => {
				expect(array[0]).toEqual(["x", "a"]);
				expect(array[1]).toEqual(["y", "b"]);
				expect(array[2]).toEqual(["z", "c"]);
			});
		});

		describe("When: descending order is called with key=1", () => {
			beforeEach(() => {
				array = [
					["y", "b"],
					["z", "c"],
					["x", "a"]
				];

				array.sort(utility.sort(1, "desc"));
			});
			it("Then: It sort the array at 1 column", () => {
				expect(array[0]).toEqual(["z", "c"]);
				expect(array[1]).toEqual(["y", "b"]);
				expect(array[2]).toEqual(["x", "a"]);
			});
		});
	});
});