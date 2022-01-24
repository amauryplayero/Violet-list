



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
    const uploadTasks = (body) => {
        
        axios.post('http://localhost:8765/uploadTasks',body)
        .then(res=>{
            // console.log(res.data)
            console.log('tables added')
            // showAllTasks()
        
    })
    .catch(err=> console.log(err))
    }
    const createTasksTable =() => {
    axios.get('http://localhost:8765/createTasksTable')
    .then(res=> {
        console.log('table created!')
        // uploadTasks(excelRows)
    })}
   
    
    // console.log('gettablefromexcel function')
    //Read the Excel File data in binary
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    
    //get the name of First Sheet.
    var Sheet = workbook.SheetNames[0];
    
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    let showMore
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
                newLi.setAttribute('id',`li${i}`)
                newShowMoreBtn.setAttribute('class','button')
                newLi.prepend(newShowMoreBtn)
                newPara.setAttribute('id', 'para')
                newLi.appendChild(newPara)
                newPara.innerText = `${JSON.stringify(res.data[i]["nombre_del_programa"])}`
                newLi.appendChild(newCheckBox)
                
                newShowMoreBtn.setAttribute('id',`${i}`)
                newCheckBox.setAttribute('type', 'checkbox')
                newCheckBox.setAttribute('class', 'checkBox')
                
                
                    var showMore = (evt) => {
                        // console.log(evt.target.id)
                        let id = evt.target.id
                        axios.post(`http://localhost:8765/showMore:${evt.target.id}`,id)
                        .then(res=>{
                            const extraInfoContainer = document.createElement('div')
                            const h3Aprendizaje = document.createElement('h3')
                            const h3Enfasis = document.createElement('h3')
                            const paragraphA = document.createElement('p')
                            const paragraphE = document.createElement('p')
                            const specificTask = document.getElementById(`li${id}`)
                            let enfasis = res.data[0]['enfasis']
                            let aprendizaje = res.data[0]['aprendizaje_esperado']
                            
                            extraInfoContainer.appendChild(h3Aprendizaje)
                            extraInfoContainer.appendChild(h3Enfasis)
                            extraInfoContainer.setAttribute('class','extraInfo')
                            h3Aprendizaje.innerText="Aprendizaje Esperado"
                            h3Enfasis.innerText="Enfasis"
                            // paragraphA.setAttribute('class','para')
                            // paragraphE.setAttribute('class','para')
                            paragraphA.innerText=aprendizaje
                            paragraphE.innerText=enfasis
                            h3Aprendizaje.appendChild(paragraphA)
                            h3Enfasis.appendChild(paragraphE)
                            specificTask.after(extraInfoContainer)
                            // h3Aprendizaje.setAttribute('id','aprendizaje')
                            // h3Enfasis.setAttribute('id','enfasis')
                            console.log(res.data[0]['enfasis'])
                        })
                    
                }
               
            newShowMoreBtn.addEventListener('click',showMore)
                
            }
            // buttons.onclick(showMore())
        })
        .catch(err=> console.log(err))
        
        
    }
 
        createTasksTable()
        uploadTasks(excelRows)
        showAllTasks()
    
    
    
    
    
}


fileUpload.addEventListener('change', UploadProcess)







