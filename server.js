const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'react/build')));

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/react/build/index.html'));
});

// app.get('*', function(req, res){
// 	res.sendFile(path.join(__dirname, '/react/build/index.html'));
// });