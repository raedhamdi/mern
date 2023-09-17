import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Create = (props) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        
     // console.log(name);
     const tempObj ={
        name,
     };
     axios
     .post("http://localhost:8001/api/authors", tempObj)
     .then((res) => {
        console.log("**client success**");
        console.log(res.data);
        navigate("/");
     })
     .catch((err) => {
        console.log("**client error**", err);
        console.log(err.response.data.errors);
        const errorResponse = err.response.data.errors;
        const errorArr = []; // define a temp error array to push themessage in
        for(const key of Object.keys(errorResponse)){
            // Loop through the errors and get the messages
            errorArr.push(errorResponse[key].message);
            // set Errors
        }
        setErrors(errorArr);
     });

    }
    return (
        <div>
            {errors.map((err, index) => (
                <p style={{color: "red"}} key={index}>
                    {err}
                </p>
            ))}
            <form onSubmit={submitHandler}>

                <div>
                    <p>Add new author:</p>
                <label>Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div> 
                
                <button>Submit</button>
            </form>
          <Link to="/"><button>Cancel</button></Link>
        </div>
    );
};

export default Create;

