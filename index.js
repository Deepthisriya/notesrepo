const express = require('express')
const app = express()
const db = require('./db/db')
const route = require('./routes/notesrouter')
const dotenv=require('dotenv')
dotenv.config()
db()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT ||5000
app.use('/', route)

app.listen(port, () => {
    console.log('server is running on 5000')
})