const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const open = require('open');

const host = 'localhost';
const port = 1111;

const requestListener = async function (req, res) {
  try {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(await fs.readFile(path.join(__dirname, '/public', 'index.html')));
      return;
    }

    const filePath = path.join(__dirname, '/public', req.url);
    const file = await fs.readFile(filePath);

    console.log('request ' + req.url);

    res.writeHead(200);
    res.end(file);
  } catch (e) {
    console.error(e);
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);

  open(`http://${host}:${port}`);
});
