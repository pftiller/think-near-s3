const pool = require('../modules/pool.js');


let callRedshift = (arr)=> {
    console.log(arr);
    for(let i = 0; i < arr.length; i++) {
            let query =  `INSERT INTO thinknear (advertiser_id, advertiser_name, io_id, io_name, line_item_id, line_item_name, date, impressions, clicks, ctr, spend, conversions, drives_conversions, calls_conversions, url_conversions, other_conversions, cvr, pccr) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`;
            pool.query(query, [arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5], arr[i][6] + '-' + arr[i][7] + '-' + arr[i][8], arr[i][9], arr[i][10], arr[i][11], arr[i][12], arr[i][13], arr[i][14], arr[i][15], arr[i][16], arr[i][17], arr[i][18], arr[i][19]])
                .then((result) => {
                    console.log(result);
                    let people = result.rows;
                    console.log(people);
                })
                .catch((err) => {
                    console.log('error', err);
                })
    }
};

module.exports = {
    callRedshift: callRedshift
}