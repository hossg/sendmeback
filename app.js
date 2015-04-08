var express = require('express')

var path = require("path")
var url = require('url')
var fs = require('fs')


var md = require('markdown-it')();

var app = express()
app.set('view engine','jade')
app.use(express.static('public'))


function getCode(req){
    var paths=url.parse(req.url).pathname.split('/')
    var code=200
    for(n=0;n<paths.length;n++){
        rc=parseInt(paths[n])
        if(!isNaN(rc)){ //look for the first thing that looks like a number and use that as the response code
            code=rc
            break;
        }
    }
    return code;
}

function sendBack(req, res, content) {
    var code = getCode(req)
    res.set(req.query)
    res.writeHead(code)
    res.end(content)
    return code
}

app.get('/sendmeback/static/*',function (req, res) {
    var filename = "static/" + path.basename(url.parse(req.url).pathname);
    var page = fs.readFileSync(filename,{'encoding':'utf8'})
    var code=sendBack(req,res, page)
    console.log("Sending static file: " + code + ' ' + JSON.stringify(req.query) + ' ' + filename)
})

app.get('/sendmeback/*',function (req, res) {
    var code = getCode(req)
    var msg=(code + ':'+ req.url)
    var code = sendBack(req,res, msg)
    console.log("Sending: " + code + ' ' + JSON.stringify(req.query) + ' ' + req.url)
})

app.get('/', function (req, res) {
    var readme = fs.readFileSync('README.md',{'encoding':'utf8'})
    var readmeHTML = md.render(readme);
    res.render('index',{title:'SendMeBack',content:readmeHTML})
    console.log('Sending index/readme page')
})

var port = process.env.PORT || 8080;  //let heroku define the port

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('SendMeBack app listening at http://%s:%s', host, port)

})
