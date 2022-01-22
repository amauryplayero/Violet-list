let fileUpload = document.querySelector('#fileUpload')


function UploadProcess() {
    //Reference the FileUpload element.
    console.log('file uploaded')
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


function GetTableFromExcel(data) {
    console.log('gettablefromexcel function')
    //Read the Excel File data in binary
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //get the name of First Sheet.
    var Sheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    
    for(let i = 1; i<50; i++){
    // ADD TASKS
    let row = `__EMPTY_${i}`
    const newLi = document.createElement('li')
    const newShowMoreBtn = document.createElement('button')
    const newCheckBox = document.createElement('input')
    ul.appendChild(newLi)
    newLi.setAttribute('id',`${i}`)
    newLi.setAttribute('class','task')
    newShowMoreBtn.setAttribute('class','button')
    newLi.innerText = `${JSON.stringify(excelRows[4][row])}`
    newLi.prepend(newShowMoreBtn)
    newLi.appendChild(newCheckBox)
    newCheckBox.setAttribute('type', 'checkbox')
    newCheckBox.setAttribute('class', 'checkBox')


    console.log(excelRows[4][row])
    }

    


}
fileUpload.addEventListener('change', UploadProcess)
