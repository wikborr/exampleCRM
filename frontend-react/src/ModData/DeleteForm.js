import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function DeleteForm(props){
    const token = props.token;
    const id = props.id;
    const type = props.type;
    const refresh = props.refresh;
    const effect = props.effect;

    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate();
    const sendForm = async e => {
        e.preventDefault();
        var response;
        if(type==="usersAdmin"){
            try{
                response = await api.delete(`/admin/users/${id}/`, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        else if(type==="me"){
            try{
                response = await api.delete(`/${id}/`, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        else{
            try{
                response = await api.delete(`/mod/${type}/${id}/`, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        console.log(response);
        if(response.status === 204 || response.status === 202 || response.status === 200){
            refresh(!effect);
        }
        else{
            setConfirm("Delete unsuccessful!");
        }
    }

    return(
        <div className="DeleteForm">
            <form onSubmit={sendForm}>
                <h2>Are you sure?</h2>
                <br />
                <button className="CUDButton-delete" type='submit'>DELETE</button>
                &nbsp;&nbsp;
                <input className="input-output" type="text" value={confirm} disabled/>
            </form>
        </div>
    );
}

export default DeleteForm;