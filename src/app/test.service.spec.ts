import { Calculator } from "./test.service";

describe('Calculator', () => {
    it("should add 2 number", () => {
        const service = new Calculator();
        expect(service.add(2, 2)).toBe(4);
    });
    it("should sub 2 number", () => {
        const service = new Calculator();
        expect(service.subtract(2, 2)).toBe(0);
    });
});