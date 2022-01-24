require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const{ uploadTasks, createTasksTable, showAllTasks, showMore } = require('./controller')

app.use(express.json())
app.use(cors())

app.get('/createTasksTable', createTasksTable)
app.post('/uploadTasks', uploadTasks)
app.get('/showAllTasks', showAllTasks)
app.post('/showMore:id',showMore)
// app.get('/extraInfo', getExtraInfo)




app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))