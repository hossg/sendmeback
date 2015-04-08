/**
 * Created by hossein on 25/03/15.
 */
/**
 * Created by hossein on 24/03/15.
 */

var expect = require('chai').expect;
var request = require('request');
var cheerio = require('cheerio');

describe("sendmeback",function() {

    it("should respond to a /sendmeback request with the correct code and body", function (done) {
        request("http://localhost:8080/sendmeback/201/test", function (error, response, body) {
            expect(response.statusCode).to.equal(201)
            expect(body).to.equal("201:/sendmeback/201/test");
            done();
        });
    });

    it("should respond to a parameterised /sendmeback request with the HTTP headers", function (done) {
        request("http://localhost:8080/sendmeback/201/test?Pragma=test1&Content-Type=text/txt;%20charset=utf-8", function (error, response, body) {

            expect(response.headers.pragma).to.equal("test1");
            expect(response.headers['content-type']).to.equal("text/txt; charset=utf-8");
            expect(response.statusCode).to.equal(201)
            expect(body).to.equal("201:/sendmeback/201/test?Pragma=test1&Content-Type=text/txt;%20charset=utf-8");
            done();
        });
    });

    it("should respond to an unknown URL with a 404", function (done) {
        request("http://localhost:8080/notrecognisedurl", function (error, response, body) {
            expect(response.statusCode).to.equal(404)
            done();
        });
    });

    it("should have a README page as the index page, with title SendMeBack", function (done) {
        request("http://localhost:8080/", function (error, response, body) {
            var body=response.body;
            var $=cheerio.load(body);
            expect($('h1').text()).to.equal('SendMeBack - a simple HTTP echo server');
            done();
        });
    });

    it("should return a static test page when requested, annotated with the right headers and status code", function (done) {
        request("http://localhost:8080/sendmeback/static/201/test.html?Pragma=test1&Content-Type=text/txt;%20charset=utf-8", function (error, response, body) {

            expect(response.headers.pragma).to.equal("test1");
            expect(response.headers['content-type']).to.equal("text/txt; charset=utf-8");
            expect(response.statusCode).to.equal(201)
            var body=response.body;
            var $=cheerio.load(body);
            expect($('h1').text()).to.equal('This is a test');
            done();
        });
    });
});



