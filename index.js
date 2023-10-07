const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const port = 3000
const myRoute = require('./server')

var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(jsonParser)
app.use('/', myRoute)
app.listen(port, () => console.log(`server is listening on port ${port}`))
