import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const {id} = useParams()
    const nav = useNavigate();
    useEffect(()=>{
        axios
        .get("http://localhost:8001/api/authors/" +id )
        .then((serverResp)=>{
            console.log(serverResp.data);
            setName(serverResp.data.name)
        
        })
        .catch((err)=>{
            console.log(err);

        });
    },[id]);
    const updateHandler = (e) =>{
        e.preventDefault();
        // PUT REQUEST
        const updateObj = {
            name
           
        }
        axios.put("http://localhost:8001/api/authors/" +id, updateObj)
        .then((res)=>{
            console.log("**client success**");
           console.log(res.data);
           nav("/"); 
        })
        .catch((err)=>{
            console.log("**client error**");
            console.log(err);
            const errorResponse = err.response.data.errors;
            const errorArr = []; // define a temp error array to push the message in
            for(const key of Object.keys(errorResponse)){
                // Loop through the errors and get the messages
                errorArr.push(errorResponse[key].message);
            }
            // set errors
            setErrors(errorArr);
        });
    };
  return (
    <div>
           {errors.map((err, index) => (
                <p style={{color: "red"}} key={index}>
                    {err}
                </p>
             ))}
          <form onSubmit={updateHandler}>   
                <div>
                    <p>Edit this author</p>
                <label>Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div> 
                <button>Submit</button>
            </form>
            <Link to="/"><button>Cancel</button></Link>
    </div>
  )
}

export default Update