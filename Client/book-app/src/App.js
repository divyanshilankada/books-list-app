import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import BookList from './components/bookList';
import NewBookDetails from './components/newBookDetails';
import BookRecord from './components/bookrecord';
import EditBook from './components/editbook';
import './styles/App.css'

function App() {
  return (
    <div className="App">
         <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/booklist' element={<BookList />}></Route>
                <Route path='/newbookdetails' element={<NewBookDetails />}></Route>
                <Route path='/bookrecord' element={<BookRecord />}></Route>
                <Route path='/editbook' element={<EditBook />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
