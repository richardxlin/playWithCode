const http = require('http');

http.createServer(listener).listen(process.argv[2]);

function listener(req, res){
  let requestData = [];
  req
    .on('data', data => requestData.push(data))
    .on('end', () => {
      if (req.method === 'POST') {
        res.writeHead(200, {'content-type': 'text/plain'})
        res.end(requestData.join('').toUpperCase());
      }
    })
}

//Better solution:
// var http = require('http')
//  var map = require('through2-map')
//
//  var server = http.createServer(function (req, res) {
//    if (req.method != 'POST')
//      return res.end('send me a POST\n')
//
//    req.pipe(map(function (chunk) {
//
//      return chunk.toString().toUpperCase()
//    })).pipe(res)
//  })
//
//  server.listen(Number(process.argv[2]))
