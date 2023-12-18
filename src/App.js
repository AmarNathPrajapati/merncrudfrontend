import {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import FormData from './components/FormData';
// axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.baseURL = "https://merncrudbackend-nwy7.onrender.com/api"
function App() {
/******  Steps for getting the users details *****/
    //collecting the data
    const [getData, setGetData] = useState([]);
    //fetching the data
    const getFetchData = async() =>{
      const fetchData = await axios.get('/fetchuser');
      if(fetchData.data.status){
        setGetData(fetchData.data.UsersData);
      }
    }
    useEffect(()=>{
      getFetchData();
    },[])

/******  Steps for Creating New User *****/
    //storing the new data
    const [data, setdata] = useState({name: "", email: "", phone: ""})//should be exactly same as name values
    //handle on change for the new data
    const handleChange = (e) => {
      const name = e.target.name; // value of name attribute
      const value = e.target.value; // value of value attribute
      setdata((prev) => {
          return({
              ...prev,
              [name]: value
          })
      })
    }
    //posting the data (for the new data)
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post('/createuser',data).then(() => {
          alert("Data successfully added");
          getFetchData();
          setdata({
            'name': '',
            'email':'',
            'phone':''
          })
      }).catch(() => {
          alert("Something went wrong")
      })
    }

/******  Steps for updating the data *****/
    // storing the updated data
    const [show, setshow] = useState(false);
    const [editData, setEditData] = useState({
      "name":"",
      "email":"",
      "phone":"",
      "id":"",
    })
    const handleEdit = (val) =>{
      setEditData(val);
      setshow(true);
    }
    
    //handle on change for the updated data
    const handleEditChange = (e) =>{
      const name = e.target.name; // value of name attribute
        const value = e.target.value; // value of value attribute
        setEditData((prev) => {
            return({
                ...prev,
                [name]: value
            })
        })
    }
    //updating the data
    const handleUpdate = async(e) =>{
      e.preventDefault();
      const data =  await axios.put('/updateuser',editData);
      if(data.data.success){
        getFetchData();
      }
    }
/****** Deleting the data ********/
    //deleting the user data
    const handleDelete = async(id) =>{
      await axios.delete('/deleteuser/'+id).then(()=>{
        alert("Data Deleted Successfully")
        getFetchData();
      }).catch(()=>{
        alert('something is going wrong')
      })
    }
    return (
      <>
            <div className="App">
            <h1 className="text-center py-3">
                Welcome to the React CRUD Application
            </h1>
            {
              (show) 
              &&
              (<FormData   
              handleChange = {handleEditChange}
              handleSubmit = {handleUpdate}
              data = {editData}
              />)
            }
            {/* section 1 to create user */}
            <div className='text-center py-3'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add User
                </button>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter User Data</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fs-5">Name</label>
                                    <input onChange={handleChange}
                                        value={
                                            data.name
                                        }
                                        type="text"
                                        className="form-control"
                                        name='name'
                                        id="name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fs-5">Email</label>
                                    <input onChange={handleChange}
                                        value={
                                            data.email
                                        }
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name='email'
                                        aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label fs-5">Phone</label>
                                    <input onChange={handleChange}
                                        value={
                                            data.phone
                                        }
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name='phone'/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/*section 2 Show user Details */}
            <h2 className="text-center pb-3">Users Data</h2>
            <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th colSpan={2} scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                  {getData[0]?
                    (getData.map((val,i)=>{
                      i+=1;
                      return(
                        <tr>
                            <th scope="row">{i}</th>
                            <td>{val.name}</td>
                            <td>{val.phone}</td>
                            <td>{val.email}</td>
                            {/* <td><button className="btn btn-primary">Update</button></td> */}
                            <td>
                            <button onClick={()=>{handleEdit(val)}} className="btn btn-primary">update</button>
                            </td>
                            <td><button onClick={()=>{handleDelete(val._id)}} className="btn btn-danger">Delete</button></td>
                        </tr>
                      )
                    })):(
                      <p>
                        No data found!
                      </p>
                    )
                  }
                </tbody>
            </table>
            </div>
        </div>
      </>
    );
}

export default App;
