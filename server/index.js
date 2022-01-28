require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 8765
const{ uploadTasks, createTasksTable, showAllTasks, showMore, makeComplete } = require('./controller')


app.use(express.json())
app.use(cors())
// app.use(express.static('public'))
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });


app.get('/createTasksTable', createTasksTable)
app.post('/uploadTasks', uploadTasks)
app.get('/showAllTasks', showAllTasks)
app.post('/showMore:id',showMore)
app.put('/makeComplete:id',makeComplete)




app.listen(PORT, () => console.log(`up on ${PORT}`))