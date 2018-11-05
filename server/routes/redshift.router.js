const pool = require('../modules/pool.js');


let callRedshift = (arr, dateData) => {
    if(dateData.month == dateData.yesterdayMonth) {
        let startDate = `${dateData.year}-${dateData.month}-01`;
        let endDate = `${dateData.year}-${dateData.month}-${dateData.lastDayThisMonth}`;
        let firstQuery =  `DELETE FROM thinknear WHERE date >= $1 AND date <= $2`
            pool.query(firstQuery, [startDate, endDate])
                .then(() => {
                    console.log('successful delet');
                    putToRedshift(arr);
                })
                .catch((err) => {
                    console.log('error', err);
                })
    }
    else {
        putToRedshift(arr)
    }
}

let putToRedshift = (arr) => {
    let platform = 'Geofencing/Georetargeting';
    for(let i = 0; i < arr.length; i++) {
            let secondQuery =  `INSERT INTO thinknear (platform, advertiser_id, advertiser_name, line_item_name, date, impressions, clicks, spend, drives_conversions, calls_conversions, url_conversions, other_conversions) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
            pool.query(secondQuery, [platform, arr[i][0], arr[i][1], arr[i][5], arr[i][6] + '-' + arr[i][7] + '-' + arr[i][8], arr[i][9], arr[i][10], arr[i][12], arr[i][14], arr[i][15], arr[i][16], arr[i][17]])
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