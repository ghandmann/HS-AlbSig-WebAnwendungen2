var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("EntriesAPI", () => {
    describe("GET all entries", () => {
        it("should return an empty list", async () => {
            let res = await chai.request(app).get("/api/v1/entries");

            res.should.have.status(200);
        });

        it("should return an entry after posting", async () => {
            let createEntryResponse = await chai.request(app).post("/api/v1/entries").send({ name: "Testing Name", text: "Testing Entry" });
            createEntryResponse.should.have.status(200);

            let getEntriesResponse = await chai.request(app).get("/api/v1/entries");

            getEntriesResponse.should.have.status(200);

            var entries = getEntriesResponse.body;
            entries.should.be.a('array');
            entries.should.have.length(1);
        });

        it("should allow to delete an entry", async () => {
            let createEntryResponse = await chai.request(app).post("/api/v1/entries").send({ name: "Testing Name", text: "Testing Entry" });
            createEntryResponse.should.have.status(200);

            let deleteResponse = await chai.request(app).delete("/api/v1/entries/1");

            deleteResponse.should.have.status(200);
        })
    })
});