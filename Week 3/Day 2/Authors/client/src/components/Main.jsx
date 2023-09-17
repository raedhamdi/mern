import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authorStyle from "./Main.module.css";
import { Link } from 'react-router-dom';

export
 const Main = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
   //get all the authors from DB
   axios
   .get("http://localhost:8001/api/authors")
   .then((res)=>{
    console.log(res);
    setAuthors(res.data);
   })
   .catch((err) => {
    console.log(err);
    });
  }, []);
  const goToUpdate = (authorId) => {
    navigate("/authors/" + authorId + "/edit");
  };

  const deleteAuthor = (authorId) => {
    axios
    .delete("http://localhost:8001/api/authors/" + authorId)
    .then((serverResponse)=> {
      console.log("Delete Successfull", serverResponse.data);
      // remove from the DOM
      setAuthors(authors.filter((author)=> author._id !== authorId ))
    })
    .catch((err) => console.log(err));


  };

  return ( <div>
  {/*JSON.stringify(authors)*/} 


  <Link to="/create">Add an authors</Link>
  <p className={authorStyle.tag}>We have quotes by:</p>
    {authors.map((oneAuthor)=>{
      return(
      <div className={authorStyle.author} >
        

<table>
       
        <tr> <th>Author</th> 
        <th>Action available</th></tr>
        <tr><td>{oneAuthor.name}</td> 
        <td> <button onClick={() => goToUpdate(oneAuthor._id)}>edit</button>
        <button onClick={() => deleteAuthor(oneAuthor._id)}>delete</button></td></tr>  
         
        </table>
        </div>
       
     

    )})}
  
    </div>
  );
};

export default Main; 
