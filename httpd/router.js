
let staticFile = (fname) => {
  let fs = require('fs');
  let path = require('path');
  let mime_type = require('./config/mime.json');

  let mime = mime_type[path.extname(fname)]

  return (response) => {
    if (fname) {
      fs.readFile(fname, (err, data) => {
        if (err) {
          console.log(`檔案讀取錯誤: ${err}`);
        }
        else {
          response.writeHead(200, {
            'Content-Type': mime,
          });

          response.write(data);
          response.end();
        } // if
      });
    }
  };
} // staticFile()

exports.route = (url_string) => {
  let url = require('url');
  let route_table = require('./config/route.json');
  let pathname = url.parse(url_string).pathname;

  pathname = route_table[pathname] || pathname;

  return staticFile(pathname);
}

// router.js.
