import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/newbooklist.css';


function NewBookDetails () {

    const navigate = useNavigate()

    const [title,setTitle] = useState("");
    const [isbn,setIsbn] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState("");
    const [publisher,setPublisher] = useState("");
    const [genre,setGenre] = useState("");
    const [error, setError] = useState("");
    var header = {token: localStorage.getItem('token')};


    function handleTitle(e)
    {
        setTitle(e.target.value);
    }

    function handleIsbn(e)
    {
        setIsbn(e.target.value);
    }

    function handleAuthor(e)
    {
        setAuthor(e.target.value);
    }

    function handleDescription(e)
    {
        setDescription(e.target.value);
    }

    function handleDate(e)
    {
        setDate(e.target.value);
    }

    function handlePublisher(e)
    {
        setPublisher(e.target.value);
    }

    function handleGenre(e)
    {
        setGenre(e.target.value);
    }

    function handleSubmit()
    {
        if(title === "" || author === ""|| genre === ""|| isbn === ""|| publisher === ""||date=== ""||description==="")
        {
            setError("*All fields are mandatory");
        }
        else
        {
            setError("");

            let userObj = {"title" : title, "author" : author, "genre" : genre, "isbn":isbn, "description":description, "date":date, "publisher":publisher };
    
            axios.post('http://localhost:8080/newbook',userObj, {
                headers:header
            })
            .then(response => {console.log(response); navigate("/booklist");})
            .catch(error => {
                console.log(error);
            });
        }

       
    }
    
    
    return (
        <div className='new_book_list_container'>
                            <Link to='/booklist' className='nav_booklist_page'>Show Book List</Link>
            <div className='new_book_list_box'>
                <h1>Add Book</h1>
                <p>Create new Book</p>

                <input className='newbook_input' type='text' placeholder='Title of the book' value={title} onChange={handleTitle}></input>
                <input className='newbook_input' type='text' placeholder='ISBN' value={isbn} onChange={handleIsbn}></input>
                <input className='newbook_input' type='text' placeholder='Author' value={author} onChange={handleAuthor}></input>
                <input className='newbook_input' type='text' placeholder='Describe this book' value={description} onChange={handleDescription}></input>
                <input className='newbook_input' type='text' placeholder='Published date' value={date} onChange={handleDate}></input>
                <input className='newbook_input' type='text' placeholder='Publisher of this book' value={publisher} onChange={handlePublisher}></input>
                <input className='newbook_input' type='text' placeholder='Genre' value={genre} onChange={handleGenre}></input>

                {error === "" ? <></> : <p>{error}</p>}
                <button className='newbook_button' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default NewBookDetails;

