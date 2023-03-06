import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function Login(props){
    const role = props.role;
    const setToken = props.setToken;
    const setId = props.setId;
    const setRole = props.setRole;

    const [form, setForm] = useState({});
    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate(); 
    const sendForm = async e => {
        e.preventDefault();
        console.log(form);
        var response;
        try{
            response = await api.post(`/login/`, form);

            if(response.status === 200){
                console.log(response)
                setConfirm("Login successful!");
                setToken(response.data.token)
                setId(response.data.userId)
                setRole(response.data.roleId)
                navigate("/users");
            }
            else{
                setConfirm("Login unsuccessful!");
            }
        }
        catch(e){
            console.log(e.response)
            if(e.response.data.login){
                setConfirm("Unrecognized login!");
            }
            else if(e.response.data.password){
                setConfirm("Unrecognized password!");
            }
            else{
                setConfirm("Login unsuccessful!");
            }
        }
    }

    if(role<4){
        return null;
    }

    return(
        <div className="Login">
            <form onSubmit={sendForm}>
                <label>Login:&nbsp;</label>
                <input type="text" value={form.login} onChange={(e) => setForm(Object.assign({},form,{"login":e.target.value}))}/>
                <br />
                <label>Password:&nbsp;</label>
                <input type="text" value={form.password} onChange={(e) => setForm(Object.assign({},form,{"password":e.target.value}))}/>
                <br />
                <br />
                <button className="page-button-button" type='submit'>Login</button>
                <br />
                <input className="input-output" type="text" value={confirm} disabled/>
            </form>
        </div>
    );

}

export default Login;