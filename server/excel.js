
let fileUpload = document.querySelector('#fileUpload')
// const {createTasks} = require('./main')
// console.log(createTasks)

function UploadProcess() {
    //Reference the FileUpload element.
    // console.log('file uploaded')
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
 
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    GetTableFromExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    GetTableFromExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
};


const ul = document.querySelector('#ulOfTasks')
const showMoreBtn = document.querySelector('.button')
const checkBox = document.querySelector('.checkBox')
const btn = document.querySelector('.button')

function GetTableFromExcel(data) {
    
    // console.log('gettablefromexcel function')
    //Read the Excel File data in binary
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //get the name of First Sheet.
    var Sheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    createTasks()
    // console.log(excelRows[4]['__EMPTY_1'])
    // console.log(excelRows[5]['__EMPTY_1'])
    // console.log(excelRows[6]['__EMPTY_1'])
    for(let i = 1; i<50; i++){
        // ADD TASKS
        const newLi = document.createElement('li')
        const newShowMoreBtn = document.createElement('button')
        const newCheckBox = document.createElement('input')
        const newPara = document.createElement('p')
    
    let row = `__EMPTY_${i}`
    // let collumn = `__EMPTY_${i}`
    // console.log(collumn)
    ul.appendChild(newLi)
    newLi.setAttribute('class','task')
    newShowMoreBtn.setAttribute('class','button')
    newLi.prepend(newShowMoreBtn)
    newPara.setAttribute('id', 'para')
    newLi.appendChild(newPara)
    newPara.innerText = `${JSON.stringify(excelRows[4][row])}`
    newLi.appendChild(newCheckBox)

    newShowMoreBtn.setAttribute('id',`${i}`)
    newCheckBox.setAttribute('type', 'checkbox')
    newCheckBox.setAttribute('class', 'checkBox')
    }
    
}

// const showMore = (id)=>{
//     id = newShowMoreBtn.getAttribute('id')
//      console.log('btn clicked')
//      console.log(id)
//  }
// newShowMoreBtn.addEventListener('click',showMore)





fileUpload.addEventListener('change', UploadProcess)



// module.exports = {
//     excelRows
// }