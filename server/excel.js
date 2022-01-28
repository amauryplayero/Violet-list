let fileUpload = document.querySelector("#fileUpload");

function UploadProcess() {

  var fileUpload = document.getElementById("fileUpload");
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
}

const ol = document.querySelector("#olOfTasks");
const showMoreBtn = document.querySelector(".button");
const checkBox = document.querySelector(".checkBox");
const btn = document.querySelector(".button");

function GetTableFromExcel(data) {
    
    const createTasksTable = () => {
        axios.get("http://localhost:8765/createTasksTable").then((res) => {
            console.log("table created!");
            uploadTasks(excelRows)
        });
    };
    const uploadTasks = (body) => {
      axios
        .post("http://localhost:8765/uploadTasks", body)
        .then((res) => {
          
          console.log("tables added");
          showAllTasks()
        })
        .catch((err) => console.log(err));
    };
 
  var workbook = XLSX.read(data, {
    type: "binary",
  });

  var Sheet = workbook.SheetNames[0];
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
  
  const showAllTasks = () => {
    axios.get("http://localhost:8765/showAllTasks")
      .then((res) => {
    
        for (let i = 0; i < res.data.length; i++) {
          //     // ADD TASKS
          const buttons = document.querySelector(".button");
          const newLi = document.createElement("li");
          const newShowMoreBtn = document.createElement("button");
          const newCheckBox = document.createElement("button");
          const newPara = document.createElement("p");

          ol.appendChild(newLi);
          newLi.setAttribute("class", "task");
          newLi.setAttribute("id", `li${i}`);
          newShowMoreBtn.setAttribute("class", "button");
          newShowMoreBtn.innerText="..."
          newLi.prepend(newShowMoreBtn);
          newPara.setAttribute("id", "para");
          newLi.appendChild(newPara);
          let taskstitle = JSON.stringify(res.data[i]["nombre_del_programa"]);
          newPara.innerText = `${taskstitle.replace(/['"]+/g, "")}`;
          newLi.appendChild(newCheckBox);
          newShowMoreBtn.setAttribute("id", `${i}`);
          newCheckBox.setAttribute("id", `${i}`);
          newCheckBox.setAttribute("class", "checkBox");
          newCheckBox.checked = false

          
          const extraInfoContainer = document.createElement("div");
          var showMore = (evt) => {
            let id = evt.target.id;
            id = parseInt(id)
          
            axios
              .post(`http://localhost:8765/showMore:${id}`)
              .then((res) => {
                const h3Aprendizaje = document.createElement("h3");
                const h3Enfasis = document.createElement("h3");
                const paragraphA = document.createElement("p");
                const paragraphE = document.createElement("p");
                const specificTask = document.getElementById(`li${id}`);
                let enfasis = res.data[0]["enfasis"];
                let aprendizaje = res.data[0]["aprendizaje_esperado"];
                extraInfoContainer.appendChild(h3Aprendizaje);
                extraInfoContainer.appendChild(h3Enfasis);
                extraInfoContainer.setAttribute("class", "extraInfo");
              
                h3Aprendizaje.innerText = "Aprendizaje Esperado";
                h3Enfasis.innerText = "Enfasis";
                paragraphA.innerText = aprendizaje;
                paragraphE.innerText = enfasis;
                paragraphA.setAttribute("class", "extraInfoPara");
                paragraphE.setAttribute("class", "extraInfoPara");
                h3Aprendizaje.setAttribute("class", "title");
                h3Enfasis.setAttribute("class", "title");
                h3Aprendizaje.after(paragraphA);
                h3Enfasis.after(paragraphE);
                specificTask.after(extraInfoContainer);
                console.log(res.data[0]["enfasis"]);
            });
        }
        const makeComplete =(evt)=>{
            let id = evt.target.id
            console.log(id +'id')
            let idInt = ++id
            console.log(idInt + 'idInt')
            if(extraInfoContainer){extraInfoContainer.remove()} 
            newLi.remove()
            newShowMoreBtn.remove()
            newCheckBox.remove()
            newPara.remove()
            console.log(`button to remove clicked ${idInt}`)
            axios.put(`http://localhost:8765/makeComplete:${idInt}`).then((res)=> {

          })
        }
        newCheckBox.addEventListener('click',makeComplete)
        newShowMoreBtn.addEventListener('click',showMore)
    }
      })
      .catch((err) => console.log(err));
      
  };
  createTasksTable();
}

fileUpload.addEventListener("change", UploadProcess);
