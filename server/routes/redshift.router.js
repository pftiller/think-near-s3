let Redshift = require('node-redshift');
const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



let callRedshift = (arr)=> {
    console.log(arr);
    const query = `SELECT *
    FROM people`;
    pool.query(query)
        .then((result) => {
            let people = result.rows;
            return people;
        })
        .catch((err) => {
            console.log('error', err);
        })
};



// require('dotenv').config();
// let client = {
//     user: process.env.REDSHIFT_USER,
//     database: 'tcdb',
//     password: process.env.REDSHIFT_PASSWORD,
//     port: 5439,
//     host: process.env.REDSHIFT_HOST
// }

// let putToRedshift = ()=> {
    // redshiftClient.connect(function(err){
    //     if(err) throw err;
    //     else {
        // let redshiftClient = new Redshift(client);
        //     redshiftClient.query('SELECT * FROM "people"', {raw: true}).then(function(data){
        //         console.log(data);
        //     }, function(err) {
        //         throw err;
        //     })
               
                  
                    // redshiftClient.close();
                
            
    //     }
    // })
// }

// module.exports = {
//     putToRedshift: putToRedshift
// }
module.exports = {
    callRedshift: callRedshift
}