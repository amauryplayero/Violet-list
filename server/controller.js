require('dotenv').config({path: __dirname + '/../.env'})

const Sequelize = require('sequelize')


// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(process.env.CONNECTION_STRING,{
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {   
            rejectUnauthorized: false
        }
    }
})

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
        
)}res.status(200).send('tables added!')
        },
showAllTasks:(req, res) =>{
    console.log(req.body.id)
        sequelize.query(`SELECT * FROM tasks1a`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

    },
showMore:(req,res) =>{
    sequelize.query(
    //     `
    // SELECT aprendizaje_esperado, enfasis  FROM tasks1a
    // WHERE id = ${req.body.id}`
    )
    .then(dbRes => res.status(200).send(req.body.id))
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