import React from 'react';
import { useState,useEffect } from 'react';
import '../styles/login.css'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import '../styles/booklist.css'
import bookCover from './book.jpg'


function BookList () {

    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState([]);
    var header = {token: localStorage.getItem('token')};

    useEffect(() => {

        axios.get('http://localhost:8080/newbook',{headers:header})
            .then(response => setBookDetails(response.data.message))
            .catch(error => {
                console.log(error);
            });
    },[]);

    function handleLogout()
    {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate("/");
    }
    
    
    console.log(bookDetails);
    return (
        <div className='book_list_container'>
            <div className='book_list_box'>
                <header className='header_book_list'>
                    <h1>BOOKS LIST</h1>
                    <button onClick={handleLogout} className='logout_button'>Logout</button>
                </header>

                <div className='add_box'>
                    <Link className='add_booklist' to='/newbookdetails'>+ Add new book</Link>
                </div>
            </div>

            <div className='books_box'>
                {bookDetails.length === 0 ? <></> : bookDetails.map((book,i) => 
                
                    <Link className='book_box' key={i} to='/bookrecord' state={book}>
                        <img src={bookCover} alt='bookcover'></img>

                        <div className='book_details'>
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                            <p>{book.genre}</p>
                        </div>
                    </Link>

                )}
            </div>
        </div>


        
    );
};

export default BookList;

