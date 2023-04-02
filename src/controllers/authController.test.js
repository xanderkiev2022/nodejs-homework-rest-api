const request = require("supertest");
require("dotenv").config();

const baseURL = process.env.BASE_URL;
const testUserData = { email: "asd@asd.com", password: "qwerty" };

describe("Login User", () => {
  it("should return token + object(email and subscription", async () => {
    const res = await request(baseURL).post("/api/users/login").send(testUserData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});