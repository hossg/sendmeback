# SendMeBack - a simple HTTP echo server

SendMeBack acts as a simple HTTP echo server.  A client sends a parameterised HTTP request to the server, specifying
what it wants to see in the response.

The tool is designed to allow simple testing of intermediate network components such as firewalls and proxies.

## Usage

In a browser, or using *curl*, visit the `/sendmeback/` route with an arbitary URL. Sendmeback will respond with an HTTP
response with the response code equal to the first number it finds on the URL.

### Example:
```
$ curl -v http://localhost:8080/sendmeback/401/this/should/be/an/unauthorised
 * Hostname was NOT found in DNS cache
 *   Trying ::1...
 * connect to ::1 port 8080 failed: Connection refused
 *   Trying 127.0.0.1...
 * Connected to localhost (127.0.0.1) port 8080 (#0)
 > GET /sendmeback/401/this/should/be/an/unauthorised HTTP/1.1
 > User-Agent: curl/7.37.1
 > Host: localhost:8080
 > Accept: */*
 >
 < HTTP/1.1 401 Unauthorized
 < X-Powered-By: Express
 < Date: Tue, 24 Mar 2015 09:56:49 GMT
 < Connection: keep-alive
 < Transfer-Encoding: chunked
 <
 * Connection #0 to host localhost left intact
 401:/sendmeback/401/this/should/be/an/unauthorised
 ```

## Installation

*Sendmeback* requires [node.js](https://nodejs.org/). Install node, and then install *sendmeback*:
```
npm install sendmeback
```

You can then start *sendmeback* either with:
```
node app.js
```
or
```
npm start
```
