require('dotenv').config({path: __dirname + '/../.env'})
// let {CONNECTION_STRING} = process.env
// let {CONNECTION_STRING} = 'hai'
const Sequelize = require('sequelize')
// console.log(process.env.CONNECTION_STRING)
// console.log(process.env.SERVER_PORT)
// console.log(process.env.CONNECTION_STRING)

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(process.env.CONNECTION_STRING,{
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {   
            rejectUnauthorized: false
        }
    }
})
console.log(sequelize.query)
let request =[]
console.log('jai')
module.exports = {
createTasksTable:(req, res) =>{
    // CREATE TABLE tasks1a (
    //     task_id SERIAL PRIMARY KEY,
    //     nombre_del_programa VARCHAR(500),
    //     aprendizaje_esperado VARCHAR(500),
    //     enfasis VARCHAR(500),
    //     complete BOOLEAN);
    // console.log(dbRes)
    sequelize.query(`
     CREATE TABLE tasks1a (
             task_id SERIAL PRIMARY KEY,
             nombre_del_programa VARCHAR(500),
             aprendizaje_esperado VARCHAR(500),
             enfasis VARCHAR(500),
             complete BOOLEAN);
        
        `)
         .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
},

uploadTasks:(req, res)=> {
    // console.log(req.body)
    for(let i =1; i<50;i++){
    sequelize.query(

        `INSERT INTO tasks1a 
        (nombre_del_programa, aprendizaje_esperado, enfasis, complete)
      VALUES(
          '${req.body[4][`__EMPTY_${i}`]}', 
          '${req.body[5][`__EMPTY_${i}`]}', 
          '${req.body[6][`__EMPTY_${i}`]}', 
           false)`
        
)}[then(dbRes=>res.status(200).send('tables added!'))]
        },
showAllTasks:(req, res) =>{
    // console.log(req.body)
        sequelize.query(`SELECT * FROM tasks1a`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

    }
}


// SQL FOR THE TASKS
// -- CREATE TABLE tasks1A (
//     --             task_id SERIAL PRIMARY KEY,
//     --             nombre_del_programa VARCHAR(500),
//     --             aprendizaje_esperado VARCHAR(500),
//     --             enfasis VARCHAR(500),
//     --             complete BOOLEAN)
              
              
//     -- INSERT INTO tasks1A (nombre_del_programa, aprendizaje_esperado,enfasis, complete)
//     -- VALUES('nombre with variable', 'aprendizaje with variable', 'enfasis with variable', false)