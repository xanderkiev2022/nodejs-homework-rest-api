const { login } = require("./authController");

describe('login', () => {
    it('should return token + object', () => {
        const actualResult = 1;
        const expectedResult = 2;
        expect(actualResult).toEqual(expectedResult);
    });
});