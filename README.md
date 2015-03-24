# SendMeBack - a simple HTTP echo server

SendMeBack acts as a simple HTTP echo server.  A client sends a parameterised HTTP request to the server, specifying
what it wants to see in the response.

The tool is designed to allow simple testing of intermediate network components such as firewalls and proxies.

## Usage

In a browser, or using *curl*, visit the `/sendmeback/` route with an arbitary URL. *Sendmeback* will respond with an HTTP
response with the response code equal to the first number it finds on the URL.

*Sendmeback* will take all parameters passed to the URL and use them as HTTP headers in the response.

### Example:
```
$ curl -v http://localhost:8080/sendmeback/201/test?Content-Type=text%2fcsv\&Pragma=custom
* Hostname was NOT found in DNS cache
*   Trying ::1...
* connect to ::1 port 8080 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /sendmeback/201/test?Content-Type=text%2fcsv&Pragma=custom HTTP/1.1
> User-Agent: curl/7.37.1
> Host: localhost:8080
> Accept: */*
>
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: text/csv; charset=utf-8
< Pragma: custom
< Date: Tue, 24 Mar 2015 14:04:06 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
201:/sendmeback/201/test?Content-Type=text%2fcsv&Pragma=custom
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

## Homepage

You can find details of *sendmeback* at the project homepage: [https://github.com/hossg/sendmeback](https://github.com/hossg/sendmeback)

