
const AWS = require('aws-sdk');
const ClaudiaApiBuilder = require('claudia-api-builder');

var api = new ClaudiaApiBuilder();
var dynamo = new AWS.DynamoDB.DocumentClient();

api.get('/hello', function () { return 'Hello world!'; });

api.post('/icecreams',
  function (req) {
    var params = {  
      TableName: 'icecreams',  
      Item: {
          icecreamid: req.body.icecreamId,
          name: req.body.name // icecream name
      } 
    }
    return dynamo.put(params).promise();
  },
  { success: 201 }
);

api.get('/icecreams',
  function (req) {
    return dynamo.scan({ TableName: 'icecreams' })
      .promise()
      .then(response => response.Items)
  }
);

module.exports = api;


