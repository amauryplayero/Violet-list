// require('dotenv').config({path: __dirname + '/../.env'})
const DATABASE_URL = process.env.DATABASE_URL
const Sequelize = require('sequelize')


// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(DATABASE_URL,{
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {   
            rejectUnauthorized: false
        }
    }
})
let clicks = 0
module.exports = {
createTasksTable:(req, res) =>{
    
    sequelize.query(`
    DROP TABLE IF exists tasks1a;
     CREATE TABLE tasks1a (
             task_id INT,
             nombre_del_programa VARCHAR(500),
             aprendizaje_esperado VARCHAR(500),
             enfasis VARCHAR(500),
             complete BOOLEAN);
        `)
         .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
},

uploadTasks:(req, res)=> {
   
   if(clicks<1){
       for(let i =0; i<50;i++){
        if(req.body[4][`__EMPTY_${i}`]!= undefined){
        
    sequelize.query(

        `INSERT INTO tasks1a 
        (task_id,nombre_del_programa, aprendizaje_esperado, enfasis, complete)
      VALUES(
          '${i}',
          '${req.body[4][`__EMPTY_${i}`]}', 
          '${req.body[5][`__EMPTY_${i}`]}', 
          '${req.body[6][`__EMPTY_${i}`]}', 
           false)`
        
)}}res.status(200).send('tables added!')}else{
    res.status(200).send('tables are already saved')

}

        clicks++
},
showAllTasks:(req, res) =>{
    console.log(req.body.id)
        sequelize.query(`SELECT * FROM tasks1a
        WHERE complete = false`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
showMore:(req,res) =>{
    let request = req.params.id
   let id = request.replace(':','')
   let newId = parseInt(id)+1
   sequelize.query(
    `
    SELECT aprendizaje_esperado, enfasis FROM tasks1a
    WHERE task_id = ${newId}`
).then(dbRes =>
   res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
},
makeComplete:(req,res)=>{
    let request = req.params.id
    let id = request.replace(':','')
    sequelize.query(
        `UPDATE tasks1a
        SET complete = true 
        WHERE task_id = ${id}`

    ).then(dbRes => res.status(200).send(dbRes[0]))
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