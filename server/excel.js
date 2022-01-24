


// require('dotenv').config()
let fileUpload = document.querySelector('#fileUpload')

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
    
    const showAllTasks = () => {
        axios.get('http://localhost:8765/showAllTasks')
        .then(res=>{
            // console.log(res.data)
            for(let i = 0; i<res.data.length; i++){
                //     // ADD TASKS
                let buttons = document.querySelector('.button')
                const newLi = document.createElement('li')
                const newShowMoreBtn = document.createElement('button')
                const newCheckBox = document.createElement('input')
                const newPara = document.createElement('p')
                
                // let row = `__EMPTY_${1}`
                // let collumn = `__EMPTY_${i}`
                // console.log(collumn)
                ul.appendChild(newLi)
                newLi.setAttribute('class','task')
                newShowMoreBtn.setAttribute('class','button')
                newLi.prepend(newShowMoreBtn)
                newPara.setAttribute('id', 'para')
                newLi.appendChild(newPara)
                newPara.innerText = `${JSON.stringify(res.data[i]["nombre_del_programa"])}`
                newLi.appendChild(newCheckBox)
                
                newShowMoreBtn.setAttribute('id',`${i}`)
                newCheckBox.setAttribute('type', 'checkbox')
                newCheckBox.setAttribute('class', 'checkBox')
                
            }
            // buttons.onclick(showMore())
        })
        .catch(err=> console.log(err))
        
        
    }
    const uploadTasks = (body) => {
        
        axios.post('http://localhost:8765/uploadTasks',body)
        .then(res=>{
            // console.log(res.data)
            console.log('tables added')
            showAllTasks()
        
    })
    .catch(err=> console.log(err))
}
const createTasksTable =() => {
    axios.get('http://localhost:8765/createTasksTable')
    .then(res=> {
        console.log('table created!')
        uploadTasks(excelRows)
    })}
    const showMore = (id) => {
        console.log('show more func went off')
        axios.get(`http://localhost:8765/showMore:${id}`)
        .then(res=>{
            console.log(res.data)
            
        })
    }
    
    
    
    
    createTasksTable()
    // uploadTasks(excelRows)
    
    
    showAllTasks()
    
    
}


fileUpload.addEventListener('change', UploadProcess)







