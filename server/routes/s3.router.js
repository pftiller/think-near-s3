const express = require('express');
const router = express.Router();
require('dotenv').config();
const AWS = require('aws-sdk')
const fs = require('fs')
const bucketName = 'thinknear-share';
var s3 = new AWS.S3()
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() +1;
let yesterday = (today.getDate()) - 2;

router.use('/api', (req, res, next) => {
    let key;
    if(fs.existsSync('output.txt')){
        fs.unlinkSync('output.txt');
    }
    for (let i = 0; i < 39; i++) {
        if (i < 10) {
            key = `partner=DFMStPaul/version=2013-09/totals/year=${year}/month=${month}//000${i}_part_00`;
            downloadFile(bucketName, key)
        }
        else {
            key = `partner=DFMStPaul/version=2013-09/totals/year=${year}/month=${month}/00${i}_part_00`;
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
                if (err) { 
                    throw err;
                }
                console.log('Saved!');
                });
            }
        })
}
// var params = {
//     Bucket: 'thinknear-share',
//     Prefix: 'partner=DFMStPaul/'
// }
//     s3.listObjects(params, (err, data)=>{
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.log(data);
//         }
//     })
// })



module.exports = router;