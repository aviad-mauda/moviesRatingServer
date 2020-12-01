const mysql = require('../db/mysql');

const addMovie = async (body) =>  {
    try {
        const res = await mysql.addMovie(body);
        return res;
    } catch (err) {
        throw err;
    }
}

const increaseThumb = async ({name}) =>  {
    try {
        const res = await mysql.increaseThumb(name);
        return res;
    } catch (err) {
        throw err;
    }
}

module.exports =  {
    addMovie,
    increaseThumb
}