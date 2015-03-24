/**
 * Created by hossein on 24/03/15.
 */
require("jasmine")
var request = require('request');

describe("sendmeback",function() {

    it("should respond to a /sendmeback request with the correct code and body", function (done) {
        request("http://localhost:8080/sendmeback/201/test", function (error, response, body) {
            expect(response.statusCode).toBe(201)
            expect(body).toEqual("201:/sendmeback/201/test");
            done();
        });
    });

    it("should respond to a parameterised /sendmeback request with the HTTP headers", function (done) {
        request("http://localhost:8080/sendmeback/201/test?Pragma=test1&Content-Type=text/txt;%20charset=utf-8", function (error, response, body) {

            expect(response.headers.pragma).toEqual("test1");
            expect(response.headers['content-type']).toEqual("text/txt; charset=utf-8");
            expect(response.statusCode).toBe(201)
            expect(body).toEqual("201:/sendmeback/201/test?Pragma=test1&Content-Type=text/txt;%20charset=utf-8");
            done();
        });
    });


});

