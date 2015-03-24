var express = require('express')

var url = require('url')
var fs = require('fs')


var md = require('markdown-it')();

var app = express()
app.set('view engine','jade')
app.use(express.static('public'))

app.get('/sendmeback/*',function (req, res) {
  paths=url.parse(req.url).pathname.split('/')
  code=200
  for(n=0;n<paths.length;n++){
    rc=parseInt(paths[n])
    if(!isNaN(rc)){
      code=rc
      break;
    }
  }
  res.writeHead(code)
  msg=code + ':' + req.url
  res.end(msg)
  console.log(msg)
})

app.get('/', function (req, res) {
    var readme = fs.readFileSync('README.md',{'encoding':'utf8'})
    var readmeHTML = md.render(readme);
    res.render('index',{title:'SendMeBack',content:readmeHTML})
})

var port = process.env.PORT || 8080;  //let heroku define the port

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
