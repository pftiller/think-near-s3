const express = require('express');
const router = express.Router();
require('dotenv').config();
const AWS = require('aws-sdk')
const fs = require('fs')
const bucketName = 'thinknear-share';
var s3 = new AWS.S3()
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let yesterday = (today.getDate()) - 1;
router.use('/api', (req, res, next) => {
    let key;
    for (let i = 0; i < 39; i++) {
        if (i < 10) {
            key = `partner=DFMStPaul/version=2013-09/totals/year=${year}/month=${month}/day=${yesterday}000${i}_part_00`;
            downloadFile(bucketName, key)
        }
        else {
            key = `partner=DFMStPaul/version=2013-09/totals/year=2018/month=10/00${i}_part_00`;
            downloadFile(bucketName, key)
        }
    }
    res.sendStatus(200);
})

let downloadFile = (bucketName, key) => {
    var params = {
        Bucket: bucketName,
        Key: key
    }
 
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            fs.appendFile('output.txt', data.Body, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
          
        }
        
    })
}



module.exports = router;