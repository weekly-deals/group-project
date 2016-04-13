var AWS = require('aws-sdk');
var keys = require('../config.js');


AWS.config.update({
    accessKeyId: keys.amazonAccess,
    secretAccessKey: keys.amazonSecret,
    region: keys.amazonRegion
});

var s3 = new AWS.S3();

module.exports = {
  postImage: function(req, res) {

var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
console.log('saving image');
// bucketName var below crates a "folder" for each user
var bucketName = 'weekly-deals-devmtn/' /*+ req.body.userEmail*/;
// console.log(buf);
var params = {
    Bucket: bucketName,
    Key: req.body.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.imageExtension,
    ACL: 'public-read',
};
// console.log(s3.config);
s3.upload(params, function (err, data) {
  if (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  else {
    res.json(data);
    console.log('uploading');
  }
});

}
};
