
let serve = (action) => {
  let fs = require('fs');

  let services = {
    "update": (response, data) => {
      let char = JSON.parse(data);

      fs.writeFile(
        `./data/${char.name}.json`,
        JSON.stringify(char, null, 2),
        'utf8',
        err => {
        if (err) {
          console.log(`檔案寫入錯誤: ${err}`);
        } // if

        response.writeHead(200, {
          'Content-Type': 'text/plain',
        });

        response.end('ok');
      });
    },
  };

  return (response, data) => {
    services[action](response, data);
  };
};

let staticFile = (fname) => {
  let fs = require('fs');
  let path = require('path');
  let mime_type = require('./config/mime.json');

  console.log(`staticFile ${fname}`);0
  let mime = mime_type[path.extname(fname)] || 'application/octet-stream';

  return (response) => {
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
  };
} // staticFile()

exports.route = (url_string) => {
  let path = require('path');
  let url = require('url');
  let route_table = require('./config/route.json');
  let pathname = url.parse(url_string).pathname;
  let obj_path = path.parse(pathname);

  if (obj_path.ext || obj_path.dir == '/') {
    return staticFile(route_table[pathname] || pathname);
  }
  else {
    return serve(route_table[obj_path.dir]);
  }
};

// router.js.
