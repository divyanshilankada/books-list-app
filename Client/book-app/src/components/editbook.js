import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/newbooklist.css';
import '../styles/editBook.css';


function EditBook () {

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const [title,setTitle] = useState(data.title);
    const [isbn,setIsbn] = useState(data.isbn);
    const [author,setAuthor] = useState(data.author);
    const [description,setDescription] = useState(data.description);
    const [date,setDate] = useState(data.date);
    const [publisher,setPublisher] = useState(data.publisher);
    const [genre,setGenre] = useState(data.genre);
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
    
            axios.put(`http://localhost:8080/newbook/${data._id}`,userObj, {
                headers:header
            })
            .then(response => {console.log(response); navigate("/booklist");})
            .catch(error => {
                console.log(error);
            });
        }

       
    }
    
    
    return (
        <div className='new_book_list_container edits'>
                            <Link to='/booklist' className='nav_booklist_page'>Show Book List</Link>
            <div className='new_book_list_box'>
                <h1>Edit Book</h1>
                <p>Update Book's info</p>

                <div className='input_box_edit'>
                    <p>Title</p>
                    <input className='newbook_input' type='text' placeholder='Title of the book' value={title} onChange={handleTitle}></input>
                </div>
                
                <div className='input_box_edit'>
                    <p>IDBN</p>
                    <input className='newbook_input' type='text' placeholder='ISBN' value={isbn} onChange={handleIsbn}></input>
                </div>
                
                
                <div className='input_box_edit'>
                    <p>Author</p>
                    <input className='newbook_input' type='text' placeholder='Author' value={author} onChange={handleAuthor}></input>
                </div>
                
                
                <div className='input_box_edit'>
                    <p>Description</p>
                    <input className='newbook_input' type='text' placeholder='Describe this book' value={description} onChange={handleDescription}></input>
                </div>
                
                
                <div className='input_box_edit'>
                    <p>Published Date</p>
                    <input className='newbook_input' type='text' placeholder='Published date' value={date} onChange={handleDate}></input>
                </div>
                
                
                <div className='input_box_edit'>
                    <p>Publisher of this book</p>
                    <input className='newbook_input' type='text' placeholder='Publisher of this book' value={publisher} onChange={handlePublisher}></input>
                </div>
                                
                <div className='input_box_edit'>
                    <p>Genre</p>
                    <input className='newbook_input' type='text' placeholder='Genre' value={genre} onChange={handleGenre}></input>
                </div>
                

                {error === "" ? <></> : <p>{error}</p>}
                <button className='newbook_button' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default EditBook;

