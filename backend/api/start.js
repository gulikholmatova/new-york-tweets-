const app = require('./index');
const port = 4000;
const fs = require('fs');
const https = require('https');

console.log('Connected successfully to server');

https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    app
  )
  .listen(4000, function() {
    console.log(
      'Example app listening on port 4000! Go to https://localhost:4000/'
    );
  });
