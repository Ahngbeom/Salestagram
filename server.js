const express = require('express');
const path = require('path');
const redis = require('redis');
const cors = require('cors');
const bodyParser = require('body-parser');

const redis_client = redis.createClient(6379);
redis_client.on("error", (err) => {
	console.error(err);
  });
  
  redis_client.on("ready", ()=> {
	console.log("Redis is Ready");
  });

const app = express();

app.use(express.static(path.join(__dirname, 'react/build')));
app.use(cors());
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

// app.get('/', function(req, res){
// 	res.sendFile(path.join(__dirname, '/react/build/index.html'));
// });

app.get('/product/list', function (req, res, next) {
  try {
      return res.json([
        {product_name: "???", product_details: "?????"}
      ]);
  } catch (error) {
      console.error(error);
      return res.status(500).json(error);
  }
});

app.get('/product/info', function (req, res, next) {
    try {
        return res.json({product_name: "???", product_details: "?????"});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

app.post('/product/registration', function (req, res, next) {
    try {
		// console.log(req);
		console.log(req.body);
        return res.json(req.body);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/react/build/index.html'));
});