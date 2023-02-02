import request from "supertest";
import app from "../../app/app";

describe("Core EndPoints testing", () => {
  it("should return a Home Page message", (done) => {
    request(app)
      .get("/")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toBe("Home Page");
        expect(res.statusCode).toBe(200);
        done();
      });
  }),
    it("should return Page Not Found", (done) => {
      request(app)
        .get("/jean")
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.message).toEqual("Page Not Found");
          expect(res.statusCode).toBe(404);
          done();
        });
    });
});
