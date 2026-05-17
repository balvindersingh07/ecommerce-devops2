const request = require("supertest");
const app = require("../src/index");

describe("Backend API", () => {
  test("GET /api/health returns service status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "backend"
    });
  });

  test("GET /api/products returns list", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(8);
  });

  test("GET /api/products/:id returns one product", async () => {
    const response = await request(app).get("/api/products/p1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("p1");
  });
});
