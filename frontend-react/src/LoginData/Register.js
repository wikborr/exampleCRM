import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function Register(props){
    const role = props.role;

    const [form, setForm] = useState({});
    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate(); 
    const sendForm = async e => {
        e.preventDefault();
        console.log(form)
        const response = await api.post(`/register/`, form);
        console.log(response);
        if(response.status === 201){
            setConfirm("Registration successful!");
            navigate("/");
        }
        else{
            setConfirm("Registration unsuccessful!");
        }
    }

    if(role<4){
        return null;
    }

    return(
        <div className="Register">
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
                <label>Password:&nbsp;</label>
                <input type="text" value={form.password} onChange={(e) => setForm(Object.assign({},form,{"password":e.target.value}))}/>
                <br />
                <br />
                <button className="page-button-button" type='submit'>Register</button>
                <br />
                <input className="input-output" type="text" value={confirm} disabled/>
            </form>
        </div>
    );

}

export default Register;