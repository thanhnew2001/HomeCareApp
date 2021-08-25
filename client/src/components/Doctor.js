import React, { useState, useEffect } from "react"

export default function Doctor() {
const [data, setData] = useState([]);
const endPoint = "http://localhost:4001/doctors"
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [id, setId] = useState('')
const [avatar, setAvatar] = useState('')
const [uploadFile, setUploadFile] = useState();
const [uploadMessage, setUploadMessage] = useState('');


const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, age: age, avatar: avatar})
       }).then(data => load())
   }
   else{
       console.log(avatar)
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name, age: age, avatar: avatar})
       }).then(data => load())
   }
 
   }
 
const deleteDoctor = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => load())
}
 
const editDoctor = (id, name, age, avatar) => {
   setId(id)
   setName(name)
   setAge(age)
   setAvatar(avatar)
   setUploadMessage('')
   document.querySelector("input[type='file']").value = ''
}
//get data from api
const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data));
}

function addnew(){
    setId('')
    setName('')
    setAge(0)
    setUploadMessage('')
}

function search(){

  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value


  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo)
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function populatePageNo(size){

  const pageSize = document.querySelector("#pageSize").value
  const noPage = size/pageSize
  const pageNoSelect = document.querySelector("#pageNo")
  
  while (pageNoSelect.options.length > 1) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
}
}

const handleFileUpload = () => {
    const input = document.querySelector("input[type='file']")
    const formData = new FormData()
    formData.append('myFile', input.files[0])
  
    fetch('http://localhost:4001/uploadfile', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAvatar(data.path)
      if (typeof data.path!=="undefined"){
        setUploadMessage('Upload is successful: '+data.path)
      }
      else{
        setUploadMessage('Upload failed')
      }
      
    })
    .catch(error => {
      console.error(error)
    })
  }

//load data automatically
useEffect(() => {
  search()
 }, [])
 
return (
  <div>
      <h2>Doctor Form</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Name:</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Age:</label><input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/> 
      </div>

      <div class="form-group">
      <label>Avatar:</label>
      <input type="file" onChange={()=>handleFileUpload()}/> {uploadMessage}
      
      {/* <button onClick={()=>handleFileUpload()}>Upload</button> */}
      </div>

      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Doctor Table</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Page Number: 
            <select id="pageNo" onChange={()=>search()}>
              <option value="1">1</option>
            </select>
            Page Size 
              <select id="pageSize" onChange={()=>search()}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              </select>
          </div>         
        </div>

       <table class="table table-striped">
       <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Avatar</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.age}</td>
            <td><img style={{width:"50px"}} src={'http://localhost:4001/'+a.avatar}/></td>
            <td><button className="btn btn-warning" onClick={()=> deleteDoctor(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editDoctor(a._id, a.name, a.age, a.avatar)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
