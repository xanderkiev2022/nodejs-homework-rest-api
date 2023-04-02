const request = require("supertest");
const app = require("../../app");

describe("Login User", () => {
  it("should return token + object(email and subscription", async () => {
    const userData = {
      body: {
        email: "asd@asd.com",
        password: "qwerty",
      },
    };
        console.log("userData", userData);

    const res = await request(app).post("/api/users/login").send(userData);
    console.log("res.body", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.subscription).toBe("string");
  }, 10000);
});