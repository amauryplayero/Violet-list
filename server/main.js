

const showAllTasks = () => {
    axios.get('http://localhost:8765/showAllTasks')

}

const createTasks =() => {
    console.log('created task func')
    // for(let i = 1; i<50; i++){
    //     // ADD TASKS
    //     const newLi = document.createElement('li')
    //     const newShowMoreBtn = document.createElement('button')
    //     const newCheckBox = document.createElement('input')
    
    // let row = `__EMPTY_${i}`
    // // let collumn = `__EMPTY_${i}`
    // // console.log(collumn)
    // ul.appendChild(newLi)
    // newLi.setAttribute('class','task')
    // newShowMoreBtn.setAttribute('class','button')
    // newLi.innerText = `${JSON.stringify(excelRows[4][row])}`
    // newLi.prepend(newShowMoreBtn)
    // newLi.appendChild(newCheckBox)
    // newShowMoreBtn.setAttribute('id',`${i}`)
    // newCheckBox.setAttribute('type', 'checkbox')
    // newCheckBox.setAttribute('class', 'checkBox')
    // }
    }
// module.exports = {
//     createTasks

// }