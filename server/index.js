require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8765
const{ uploadTasks, createTasksTable, showAllTasks, showMore, makeComplete } = require('./controller')

app.use(express.json())
app.use(cors())

app.get('/createTasksTable', createTasksTable)
app.post('/uploadTasks', uploadTasks)
app.get('/showAllTasks', showAllTasks)
app.post('/showMore:id',showMore)
app.put('/makeComplete:id',makeComplete)




app.listen(PORT, () => console.log(`up on ${PORT}`))