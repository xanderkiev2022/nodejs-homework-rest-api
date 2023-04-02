const request = require("supertest");
const app = require("../../app");

describe("Login User", () => {
    beforeEach(() => {
      userdata = {
          email: "asd@asd.com",
          password: "qwerty"
      };
    });

  it("should return token + object(email and subscription", async () => {

    const res = await request(app)
      .post("/api/users/login")
      .send(userdata.body);
    console.log("res.body", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.subscription).toBe("string");
  }, 30000);
});