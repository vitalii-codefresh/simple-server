const { log } = require('console');
const http = require('http');
const port = 8000;

let server = new http.Server(function(req, res) {
  var jsonString = '';
  res.setHeader('Content-Type', 'application/json');
  req.on('data', (data) => { 
      jsonString += data;
  });

  req.on('end', () => {
  const body = JSON.parse(jsonString);   
     if(req.url === "/add"){
        const firstVal = body.firstValue;
        const secondValue = body.secondValue;
        res.end(JSON.stringify({result: firstVal+secondValue}));
     }
  });
});
server.listen(port, 'localhost');
log(`server starts at port ${port}`);