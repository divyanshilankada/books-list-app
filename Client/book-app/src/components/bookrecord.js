import React from 'react';
import { useState,useEffect } from 'react';
import { Link,useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/booklist.css';
import '../styles/bookrecord.css';



function BookRecord () {

    var header = {token: localStorage.getItem('token')};
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    var header = {token: localStorage.getItem('token')};

    console.log(data);

    function handleDelete()
    {
        console.log(header);
        let id = {id:data._id};
        axios.delete(`http://localhost:8080/newbook/${data._id}`,{headers:header})
            .then(response => {console.log(response); navigate("/booklist");})
            .catch(error => {
                console.log(error);
            });
    }
    
    return (

        <div className='book_list_container'>
                                        <Link to='/booklist' className='nav_booklist_page'>Show Book List</Link>
           <div className='book_record_container'>
                <div className='new_book_list_box'>
                    <h1>Book's Record</h1>
                    <p>View Book's info</p>
                </div>

                <div className='book_info_details'>
                    <div className='book_info'>
                        <p>1</p>
                        <p>Title</p>
                        <p>{data.title}</p>
                    </div>

                    <div className='book_info'>
                        <p>2</p>
                        <p>Author</p>
                        <p>{data.author}</p>
                    </div>

                    <div className='book_info'>
                        <p>3</p>
                        <p>ISBN</p>
                        <p>{data.isbn}</p>
                    </div>

                    <div className='book_info'>
                        <p>4</p>
                        <p>Publisher</p>
                        <p>{data.publisher}</p>
                    </div>

                    <div className='book_info'>
                        <p>5</p>
                        <p>Published Date</p>
                        <p>{data.date}</p>
                    </div>

                    <div className='book_info'>
                        <p>6</p>
                        <p>Description</p>
                        <p>{data.description}</p>
                    </div>
                </div>

                <div className='book_record_buttons'>
                    <button className='delete_button' onClick={handleDelete}>Delete Book</button>
                    <Link to='/editbook' state={data} className='edit_button'>Edit Book</Link>
                </div>
            </div>
        </div>


)};

export default BookRecord;

