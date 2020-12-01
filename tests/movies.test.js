const request = require('supertest')

const app = require('../app')
const {
    movieOne,
    setupDatabase
} = require('./moviesData')

beforeEach(setupDatabase)

test('Should add movie', async () => {
    const response = await request(app)
        .post('/addMovie')
        .send({
            name : "movieOne",
            rating : 3
        })
        .expect(201)
})


test('Should fail since duplicate key', async () => {
    const response = await request(app)
        .post('/addMovie')
        .send({
            name : "movieOne",
            rating : 4
        })
        .expect(201)
        const res = await request(app)
        .post('/addMovie')
        .send({
            name : "movieOne",
            rating : 3
        })
        .expect(400)
})


test('Should fail since rating is not number', async () => {
    const response = await request(app)
        .post('/addMovie')
        .send({
            name : "movieOne",
            rating : "a"
        })
        .expect(400)
})

test('Should fail since name is empty', async () => {
    const response = await request(app)
        .post('/addMovie')
        .send({
            name : "",
            rating : 4
        })
        .expect(400)
})