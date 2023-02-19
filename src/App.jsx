import { useContext, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContext/AuthContexProvider';
import PrivateRoute from './AuthContext/PrivateRoute';
import Login from './components/login';
import Navbar from './components/navbar';
import Navbar2 from './components/Navbar2';
import Notes from './components/notes';
import Signup from './components/signup';

function App() {
  const {isAuth,logout} = useContext(AuthContext)
 
  return (
    <div className="App">
      {isAuth?<Navbar2/>:<Navbar/>}
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/notes" element={<PrivateRoute><Notes/></PrivateRoute>} ></Route>
      </Routes>
      
     
    </div>
  );
}

export default App;
