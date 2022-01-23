require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {
    uploadTasks,
    createTasksSql,
    showAllTasks,
    getExtraInfo
} = require('./controller')

app.use(express.json())
app.use(cors())


app.post('/uploadTasks', uploadTasks)
app.get('/showAllTasks', showAllTasks)
app.get('/extraInfo', getExtraInfo)




app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))