const express = require('express');
const router = express.Router();
require('dotenv').config();
const AWS = require('aws-sdk')
const fs = require('fs')
const bucketName = 'thinknear-share';
var s3 = new AWS.S3()
let today = new Date();
// let year = today.getFullYear();
// let month = today.getMonth();
let year = 2018;
let month = 10;
let yesterday = (today.getDate()) - 2;
let Redshift = require('./redshift.router');
let arrayOfInfo = [];
let count = 0;

router.use('/api', (req, res, next) => {
    let key;
    if(fs.existsSync('output.txt')){
        fs.unlinkSync('output.txt');
    }
    for (let i = 0; i < 40; i++) {
        if (i < 10) {
            key = `partner=DFMStPaul/version=2013-09/totals/year=${year}/month=${month}/000${i}_part_00`;
        }
        else {
            key = `partner=DFMStPaul/version=2013-09/totals/year=${year}/month=${month}/00${i}_part_00`;
        }
        downloadFile(key)
        .then(()=>{
            count +=1;
            if(count >= 40) {
                parseAndSend();
            }
        })
        .catch((err)=>{
            count +=1;
            console.log('here is the error', err);
        })
    }
   
    res.sendStatus(200);
})

let downloadFile = (key) => {
    var params = {
        Bucket: bucketName,
        Key: key
    }
 return new Promise(function(resolve, reject) {
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        else {
            fs.appendFile('output.txt', data.Body, function (err) {
                if (err) { 
                   console.log(params.key)
                }
                console.log('Saved!');
                resolve('ok');
                })
              
            }
     
        })
    })
}
let parseAndSend = ()=> {
    fs.readFile('output.txt', 'utf8', function(err, data) {
        if(err) throw err;
        let obj = {};
        let splitLine = data.toString().split('\n');
        for(let i = 0; i < splitLine.length; i++) {
            let splitEntry = splitLine[i].split('\t');
            if(splitEntry[8] < 10) {
                splitEntry[8] = '0'+splitEntry[8];
            }
            obj = splitEntry;
            arrayOfInfo.push(obj)
        }
        console.log(arrayOfInfo);
        Redshift.callRedshift(arrayOfInfo);
    })
}
// AWS.config.update({
//     accessKeyId: '',
//     secretAccessKey: '',
//     region: 'us-west-1'

// });
// var s3 = new AWS.S3()
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