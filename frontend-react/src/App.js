import React,{useState} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './NavData/Nav';
import UserNav from './NavData/UserNav';
import ModNav from './NavData/ModNav';
import Login from './LoginData/Login';
import Logout from './LoginData/Logout';
import Register from './LoginData/Register';
import MeDataPage from './UserData/MeDataPage';
import UserDataPage from './UserData/UserDataPage';
import ContactPersonDataPage from './ContactPeopleData/ContactPersonPage';
import CompanyDataPage from './CompanyData/CompanyPage';
import NoteDataPage from './NoteData/NotePage';
import BrandModDataPage from './BrandData/BrandModPage';


function App(){
  const [token, setToken] = useState("");
  const [id, setId] = useState(0);
  const [role, setRole] = useState(4);

  return (
    <Router>
    <div className="App">
      <Nav role={role}/>
      <UserNav role={role}/>
      <ModNav role={role}/>
      <div className="App-in">
        <Routes>
          <Route path="/" element={<Login role={role} setRole={setRole} setToken={setToken} setId={setId}/>}/>
          <Route path="/register" element={<Register role={role}/>}/>
          <Route path="/logout" element={<Logout role={role} setRole={setRole} setToken={setToken} setId={setId}/>}/>
          <Route path="/me" element={<MeDataPage id={id} token={token} role={role}/>}/>

          <Route path="/users" element={<UserDataPage token={token} role={role}/>}/>
          <Route path="/companies" element={<CompanyDataPage token={token} role={role}/>}/>
          <Route path="/notes" element={<NoteDataPage token={token} role={role}/>}/>
          <Route path="/contact" element={<ContactPersonDataPage token={token} role={role}/>}/>
          <Route path="/brands" element={<BrandModDataPage token={token} role={role}/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
