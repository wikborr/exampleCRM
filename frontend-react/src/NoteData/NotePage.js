import React,{useEffect,useState} from 'react';
import '../App.css';
import No from '../ModData/No';
import CUDButton from '../ModData/CUDButton';
import NoteDataPiece from "./NotePiece";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function NoteDataPage(props) {
  const token = props.token;
  const role = props.role;
  const [effect, setEffect] = useState(true);

  const [notes, setNotes] = useState([]);
  const [companies, setCompanies] = useState([]);

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
      const response2 = await api.get('notes', {headers: {"Authorization" : `Bearer ${token}`}});
      const data2 = response2.data;
      setNotes(data2);
    }
    getAPI();
  }, [effect, token, navigate]);

  function key2name(key, objects){
    for(const i of objects){
      if(i.id === key){
        return i.name;
      }
    }
  }

  if(role>3){
    return( <No /> );
  }

  if(role>2){
    return (
      <div className="NoteDataPage">
        <h1>Trade notes:</h1>
        {notes.map(note => (
          <NoteDataPiece role={role}
          content={note.content}
          key={note.id}
          company={key2name(note.companyId, companies)}
          id={note.id}
          adminId={note.adminId}/>
        ))}
      </div>
    );
  }
  return (
    <div className="NoteDataPage">
      <h1>Trade notes:</h1>
      <CUDButton effect={effect} refresh={setEffect} type={"notes"}  req={"POST"} token={token} roleGlobal={role}/>
      {notes.map(note => (
        <NoteDataPiece token={token} refresh={setEffect} effect={effect} role={role} json={note}
        content={note.content}
        key={note.id}
        company={key2name(note.companyId, companies)}
        id={note.id}
        adminId={note.adminId}/>
      ))}
    </div>
  );
  
}

export default NoteDataPage;