var mysql      = require('mysql');

var host = process.env.HOST || 'localhost';
var user = process.env.USER=='aviad'? 'root': 'root';
var password = process.env.PASSWORD || '';
var database = process.env.DATABASE || 'movies_rating';

var connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

const connect = async () => connection.connect();
const destroy = () => connection.end();

const addMovie = async  (movie) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'INSERT INTO movies VALUES (?, ?, ?, ?, ?)'
        var query_var = [ movie.name, movie.rating, 0, movie.imdb, new Date() ];
        connection.query(query_str, query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const increaseThumb = async (name) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'UPDATE movies SET thumbs = thumbs + 1 WHERE name = ?'
        var query_var = [name];
        connection.query(query_str, query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    })
}

module.exports =  {
    connection,
    addMovie,
    increaseThumb
    //destroy
}
