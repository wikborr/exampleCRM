import React,{useEffect,useState} from 'react';
import '../App.css';
import No from '../ModData/No';
import UserDataPiece from "./UserDataPiece";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function UserDataPage(props) {
  const token = props.token;
  const role = props.role;
  const [effect, setEffect] = useState(true);

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  
  const [pages, setPages] = useState([null,null]);
  const [queryPage, setQueryPage] = useState("1");

  let navigate = useNavigate();
  useEffect(() => {
    const getAPI = async () => {
      var response;
      try{
        response = await api.get('roles', {headers: {"Authorization" : `Bearer ${token}`}});
      }
      catch(e){
        navigate("/logout");
      }
      const data = response.data;
      setRoles(data);
      var response2;
      if(role===1){
        response2 = await api.get('admin/users', { params: {page: queryPage}, headers: {"Authorization" : `Bearer ${token}`}});
      }
      else{
        response2 = await api.get('users', { params: {page: queryPage}, headers: {"Authorization" : `Bearer ${token}`} });
      }
      const data2 = response2.data;
      var prev = data2.previous;
      if(prev!=null){
        prev = prev.charAt(prev.length-1)
        if (prev => {return !(/\d/.test(prev));}) {
          prev = "1";
        }
      }
      var next = data2.next;
      if(next!=null){
        next = next.charAt(next.length-1)
      }
      setPages([prev, next]);
      setUsers(data2.results);
    }
    getAPI();
  }, [queryPage, effect, role, token, navigate]);

  function key2name(key, objects){
    for(const i of objects){
      if(i.id === key){
        return i.name;
      }
    }
  }
  function role2class(key){
    if(key===3){
      return "UserPiece";
    }
    if(key===2){
      return "UserPieceMod";
    }
    if(key===1){
      return "UserPieceAdmin";
    }
  }

  const getPrevPage = e => {
    e.preventDefault();
    if (pages[0]!=null){
      setQueryPage(pages[0]);
    }
  }
  const getNextPage = e => {
    e.preventDefault();
    if (pages[1]!=null){
      setQueryPage(pages[1]);
    }
  }

  if(role>3){
    return( <No /> );
  }

  if(role>2){
    return (
      <div className="UserDataPage">
        <h1>Users:</h1>
        <br />
        <div class="PrevNext">
          <form class="page-button" onSubmit={getPrevPage}>
            <button class="page-button-button" type='submit' >&lt;&lt;</button>
          </form>
          &nbsp;Page {queryPage}&nbsp;
          <form class="page-button" onSubmit={getNextPage}>
            <button class="page-button-button" type='submit'>&gt;&gt;</button>
          </form>
        </div>
        {users.map(user => (
          <UserDataPiece roleGlobal={role}
          class={role2class(user.roleId)}
          key={user.id}
          name={user.name}
          surname={user.surname} 
          dateOfBirth={user.dateOfBirth} 
          role={key2name(user.roleId, roles)}
          id={user.id}/>
        ))}
      </div>
    );
  }
  if(role>0){
    return (
      <div className="UserDataPage">
        <h1>Users:</h1>
        <br />
        <div class="PrevNext">
          <form class="page-button" onSubmit={getPrevPage}>
            <button class="page-button-button" type='submit' >&lt;&lt;</button>
          </form>
          &nbsp;Page {queryPage}&nbsp;
          <form class="page-button" onSubmit={getNextPage}>
            <button class="page-button-button" type='submit'>&gt;&gt;</button>
          </form>
        </div>
        {users.map(user => (
          <UserDataPiece token={token} refresh={setEffect} effect={effect} roleGlobal={role} json={user}
          class={role2class(user.roleId)}
          key={user.id}
          name={user.name}
          surname={user.surname} 
          dateOfBirth={user.dateOfBirth}
          login={user.login}
          role={key2name(user.roleId, roles)}
          id={user.id}/>
        ))}
      </div>
    );
  }
  return null;
}

export default UserDataPage;