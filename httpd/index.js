var http = require('http');

http.createServer((request, response) => {
  let router = require('./router');

  request.on('data', (chunk) => {
    console.log(`data chunk: ${chunk}`);
  }).on('end', () => {
    let servant = router.route(request.url);

    servant(response);

    console.log(`Request for ${request.url}`);
  });
}).listen(8080);

// log message to Console
console.log('Server running at http://127.0.0.1:8080/');

// index.js.
