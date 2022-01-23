// require('dotenv').config()
// const {CONNECTION_STRING} = process.env
// const Sequelize = require('sequelize')
// const excelRows = require('./excel')

// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres', 
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })
console.log(JSON.stringify(excelRows[4]))

module.exports = {
    createTasksSql: (req,res) => {
        sequelize.query(`CREATE TABLE tasks1A (
            task_id SERIAL PRIMARY KEY,
            nombre_del_programa VARCHAR(500),
            aprendizaje_esperado VARCHAR(500),
            enfasis VARCHAR(500),
            complete BOOLEAN)

        )`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    uploadTasks:(req,res) => {
        sequelize.query(`INSERT INTO tasks1A 
        (nombre_del_programa, aprendizaje_esperado,enfasis, complete)
      VALUES(
          '${excelRows}', 
          'aprendizaje with variable', 
          'enfasis with variable', 
           false)
        )`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    showAllTasks:(req,res)=> {
        sequelize.query(`GET * FROM `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

    }
}
    // getExtraInfo:





}


// SQL FOR THE TASKS BITCH ASS MOTHERFUCKER 
// -- CREATE TABLE tasks1A (
//     --             task_id SERIAL PRIMARY KEY,
//     --             nombre_del_programa VARCHAR(500),
//     --             aprendizaje_esperado VARCHAR(500),
//     --             enfasis VARCHAR(500),
//     --             complete BOOLEAN)
              
              
//     -- INSERT INTO tasks1A (nombre_del_programa, aprendizaje_esperado,enfasis, complete)
//     -- VALUES('nombre with variable', 'aprendizaje with variable', 'enfasis with variable', false)