const pool = require('../modules/pool.js');


let callRedshift = (arr)=> {
    console.log(arr);
    for(let i = 0; i < arr.length; i++) {
            let query =  `INSERT INTO thinknear (advertiser_id, advertiser_name, line_item_name, date, impressions, clicks, spend, drives_conversions, calls_conversions, url_conversions, other_conversions) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
            pool.query(query, [arr[i][0], arr[i][1], arr[i][5], arr[i][6] + '-' + arr[i][7] + '-' + arr[i][8], arr[i][9], arr[i][10], arr[i][12], arr[i][14], arr[i][15], arr[i][16], arr[i][17]])
                .then(() => {
                    console.log('success');
                })
                .catch((err) => {
                    console.log('error', err);
                })
    }
};

module.exports = {
    callRedshift: callRedshift
}