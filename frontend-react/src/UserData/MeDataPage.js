import React,{useEffect,useState} from "react";
import No from '../ModData/No';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function MeDataPage(props){
    const token = props.token;
    const role = props.role;
    const id = props.id;

    const [form, setForm] = useState({});
    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        const getAPI = async () => {
            var response;
            try{
                response = await api.get(`/${id}/`, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
            const data = response.data;
            data['password']="NULL";
            setForm(data);
        }
        getAPI();
      }, [confirm, id, token, navigate]);

    const sendForm = async e => {
        e.preventDefault();
        console.log(form)
        const response = await api.put(`/${id}/`, form, {headers: {"Authorization" : `Bearer ${token}`}});
        console.log(response);
        if(response.status === 201 ||  response.status === 200){
            setConfirm("Account information changed successfully!");
        }
        else{
            setConfirm("Operation unsuccessful!");
        }
    }

    if(role>3){
        return(<No />);
    }

    return(
        <div className="MeDataPage">
            <form onSubmit={sendForm}>
                <label>Name:&nbsp;</label>
                <input type="text" value={form.name} onChange={(e) => setForm(Object.assign({},form,{"name":e.target.value}))}/>
                <br />
                <label>Surname:&nbsp;</label>
                <input type="text" value={form.surname} onChange={(e) => setForm(Object.assign({},form,{"surname":e.target.value}))}/>
                <br />
                <label>Date of Birth:&nbsp;</label>
                <input type="text" value={form.dateOfBirth} onChange={(e) => setForm(Object.assign({},form,{"dateOfBirth":e.target.value}))}/>
                <br />
                <label>Login:&nbsp;</label>
                <input type="text" value={form.login} onChange={(e) => setForm(Object.assign({},form,{"login":e.target.value}))}/>
                <br />
                <br />
                <button className="page-button-button" type='submit'>Change</button>
                <br />
                <input className="input-output" type="text" value={confirm} disabled/>
            </form>
        </div>
    );

}

export default MeDataPage;