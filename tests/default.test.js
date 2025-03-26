import request from 'supertest';
import app from '../src/app.js';

describe("GET /hello", () => {
    it("should be available", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
    })
})