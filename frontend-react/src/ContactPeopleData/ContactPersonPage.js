import React,{useEffect,useState} from 'react';
import '../App.css';
import No from '../ModData/No';
import CUDButton from '../ModData/CUDButton';
import ContactPersonDataPiece from "./ContactPersonPiece";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function ContactPersonDataPage(props) {
  const token = props.token;
  const role = props.role;
  const [effect, setEffect] = useState(true);

  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("")

  let navigate = useNavigate();
  useEffect(() => {
    const getAPI = async () => {
      var response;
      try{
        response = await api.get('companies', { params: { page: 1 }, headers: {"Authorization" : `Bearer ${token}`} });
      }
      catch(e){
        navigate("/logout");
      }
      var data = response.data;
      var results = data.results;
      while(data.next != null){
        response = await api.get('companies', { params: { page:  data.next.charAt(data.next.length-1)}, headers: {"Authorization" : `Bearer ${token}`} });
        data = response.data;
        for(const i of data.results){
          results.push(i);
        }
      }
      setCompanies(results);
      const response2 = await api.get('contact-people', { params: { q: query }, headers: {"Authorization" : `Bearer ${token}`} });
      const data2 = response2.data;
      setContacts(data2);
    }
    getAPI();
  }, [query, effect, token, navigate]);
  

  function key2name(key, objects){
    for(const i of objects){
      if(i.id === key){
        return i.name;
      }
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  if(role>3){
    return( <No /> );
  }

  if(role>2){
    return (
      <div className="UserDataPage">
        <h1>Contact people:</h1>
        <form class="contact-search" onSubmit={getSearch}>
          <input class="contact-search-bar" type="text" value={search} onChange={updateSearch}/>
          <button class="contact-search-button" type='submit'>Search by name</button>
        </form>
        {contacts.map(contact => (
          <ContactPersonDataPiece role={role}
          name={contact.name}
          key={contact.id}
          surname={contact.surname} 
          company={key2name(contact.companyId, companies)} 
          position={contact.position} 
          phone={contact.phone}
          email={contact.email}
          id={contact.id}
          adminId={contact.adminId}/>
        ))}
      </div>
    );
  }
  return (
    <div className="UserDataPage">
      <h1>Contact people:</h1>
      <CUDButton effect={effect} refresh={setEffect} type={"contact-people"}  req={"POST"} token={token} roleGlobal={role}/>
      <form class="contact-search" onSubmit={getSearch}>
        <input class="contact-search-bar" type="text" value={search} onChange={updateSearch}/>
        <button class="contact-search-button" type='submit'>Search by name</button>
      </form>
      {contacts.map(contact => (
        <ContactPersonDataPiece token={token} refresh={setEffect} effect={effect} role={role} json={contact}
        name={contact.name}
        key={contact.id}
        surname={contact.surname} 
        company={key2name(contact.companyId, companies)} 
        position={contact.position} 
        phone={contact.phone}
        email={contact.email}
        id={contact.id}
        adminId={contact.adminId}/>
      ))}
    </div>
  );
}

export default ContactPersonDataPage;