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


let li = document.querySelector('.task')
let showMoreBtn = document.querySelector('.button')
let checkBox = document.querySelector('.checkBox')


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
    console.log(excelRows)


    // //Create a HTML Table element.
    // var myTable  = document.createElement("table");
    // myTable.border = "1";

    // //Add the header row.
    // var row = myTable.insertRow(-1);

    // //Add the header cells.
    // var headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Id";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Name";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Country";
    // row.appendChild(headerCell);
    
    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Age";
    // row.appendChild(headerCell);
    
    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Date";
    // row.appendChild(headerCell);
     
    //  headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Gender";
    // row.appendChild(headerCell);


    // //Add the data rows from Excel file.
    // for (var i = 0; i < excelRows.length; i++) {
    //     //Add the data row.
    //     var row = myTable.insertRow(-1);

    //     //Add the data cells.
    //     var cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Id;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Name;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Country;
        
    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Age;
        
    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Date;
        
    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Gender;
    }
    

    var ExcelTable = document.getElementById("ExcelTable");
    ExcelTable.innerHTML = "";
    ExcelTable.appendChild(myTable);
;


fileUpload.addEventListener('change', UploadProcess)
// fileUpload.addEventListener('change', GetTableFromExcel)