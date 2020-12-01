const {connection} = require('../db/mysql')

const movieOne = {
    name : "movieOne",
    rating : 3
}

const setupDatabase = () => {
    return new Promise(function(resolve, reject) {
        var query_str = 'DELETE FROM movies'
        connection.query(query_str, null, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    movieOne,
    setupDatabase
}