var http = require('http'),
  fs = require('fs');

function render(path, contentType, fn) {
  fs.readFile(__dirname + '/' + path, 'utf-8', function (err, str) {
    fn(err, str, contentType);
  });
}

var app = http.createServer(function (req, res) {
  var httpHandler = function (err, str, contentType) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('An error has occured: ' + err.message);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(str);
    }
  };
  if (req.url.indexOf('/scripts/') >= 0) {
    render(req.url.slice(1), 'application/javascript', httpHandler);
  } else if (req.headers['x-requested-with'] === 'XMLHttpRequest' && req.headers['x-vanillaajaxwithoutjquery-version'] === '1.0') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World!' }));
  } else {
    render('views/index.html', 'text/html', httpHandler);
  }
});

module.exports = app;
