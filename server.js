const https = require('https')
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const cors = require('cors')

server.use(cors())
server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
server.use(function (req, res, next) {
  console.log(req.method, req.originalUrl);
  setTimeout(next, 2000);
});

async function fetch(url){
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const dataBuffers =[]
      res.on('data', data => dataBuffers.push(data.toString('utf8')))
      res.on('end', () => resolve(dataBuffers.join('')))
    }).on('error', reject)
  })
}

server.get('/api/bypostcode/:outcode', async (req, res) => {
  const { outcode } = req.params
  try {
    const resApi = await fetch(`https://uk.api.just-eat.io/restaurants/bypostcode/${outcode}`)
    return res.json(JSON.parse(resApi));
  } catch (error) {
    return res.status(500).json({
      success: false
    });
  }
})

server.use(middlewares);
server.listen(5000, () => {
  console.log('JSON Server is running - port 5000');
});
