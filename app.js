const express = require('express')
const cors = require('cors')

const router = require('./routers/router')

const app = express()
const clientDomain = process.env.CLIENT_DOMAIN;
var corsOptions = {
    origin: clientDomain,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(router)

module.exports = app
