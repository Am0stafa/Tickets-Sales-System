import request from "supertest";
import app from "./app";
import controller from "./controllers/userController"

describe("POST /create ", () => {
    it("expecting 201 status code and the created user's email.", async () => {
        const res = await request(app).post("/api/users/create").send({
            name: "foo bar",
            email: "foo@email.com",
            password: "07775000"
        })
        expect(res.statusCode).toBe(201)
        // User {anotherEmail@email.com} successfully created
    })
})

describe("GET /", () => {
    it("should return a list of all users", async () => {
        const res = await request(app).get("/api/users/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
    })

    it("should return a user with matching provided email", async()=>{
        const testEmail = "foo@email.com";
        const res = await request(app).get(`/api/users/mail/${testEmail}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
    })

    it("should return 200 status code and return data for a user with tickets", async()=>{
        const userID = "bd61f0ee92b23a7c18b4702e4b7af5071673057600567"
        const res = await request(app).get(`/api/users/ticket/${userID}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status","success");
        expect(res.body).toHaveProperty("data");

    })

    it("should return 400 status code for user with no tickets", async()=>{
        const userID = "dabbb062-398b-45e2-a420-42cb4da59af0"
        const res = await request(app).get(`/api/users/ticket/${userID}`);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(  "message","User has no orders");
    })
    it("should return 200 status code and return user with matching Id", async()=>{
        const userID = "dabbb062-398b-45e2-a420-42cb4da59af0";
        const expectedFirstname ="Talbert";
        const res = await request(app).get(`/api/users/${userID}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status","success");
        expect(res.body).toHaveProperty("data.firstName","Talbert");
    })
})