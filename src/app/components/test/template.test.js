import tempalte from "./../template";

describe("Scenario: context-menu tempalte.", () => {
	it("It is a Object.", () => {
		expect(tempalte).toEqual(expect.any(Function));
	});

	describe("Scenario: tempalte should return context-menu template string", () => {
		it("Then: expect it should return tempalte string.", () => { 
			expect(tempalte()).toEqual(expect.any(String));
		});
	});
});