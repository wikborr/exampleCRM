import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function PostForm(props){
    const token = props.token;
    const type = props.type;
    const refresh = props.refresh;
    const effect = props.effect;

    const [form, setForm] = useState({});
    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate();
    const sendForm = async e => {
        e.preventDefault();
        var response;
        if(type==="usersAdmin"){
            try{
                response = await api.post(`/admin/users/`, form,  {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        else{
            try{
                response = await api.post(`/mod/${type}/`, form, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        console.log(form);
        console.log(response);
        if(response.status === 201){
            setConfirm("Post successful!");
            refresh(!effect);
        }
        else{
            setConfirm("Post unsuccessful!");
        }
    }

    if(type==="users"){
        return(
            <div className="PostFormUser">
                <form onSubmit={sendForm}>
                    <label>Name:&nbsp;</label>
                    <input type="text" value={form.name} onChange={(e) => {let buff = form; buff["name"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Surname:&nbsp;</label>
                    <input type="text" value={form.surname} onChange={(e) => {let buff = form; buff["surname"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Date of Birth:&nbsp;</label>
                    <input type="text" value={form.dateOfBirth} onChange={(e) => {let buff = form; buff["dateOfBirth"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    else if(type==="usersAdmin"){
        return(
            <div className="PostFormUserAdmin">
                <form onSubmit={sendForm}>
                    <label>Name:&nbsp;</label>
                    <input type="text" value={form.name} onChange={(e) => {let buff = form; buff["name"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Surname:&nbsp;</label>
                    <input type="text" value={form.surname} onChange={(e) => {let buff = form; buff["surname"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Date of Birth:&nbsp;</label>
                    <input type="text" value={form.dateOfBirth} onChange={(e) => {let buff = form; buff["dateOfBirth"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Login:&nbsp;</label>
                    <input type="text" value={form.login} onChange={(e) => {let buff = form; buff["login"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Role ID:&nbsp;</label>
                    <input type="text" value={form.roleId} onChange={(e) => {let buff = form; buff["roleId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    else if(type==="companies"){
        return(
            <div className="PostFormCompany">
                <form onSubmit={sendForm}>
                    <label>Name:&nbsp;</label>
                    <input type="text" value={form.name} onChange={(e) => {let buff = form; buff["name"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>NIP:&nbsp;</label>
                    <input type="text" value={form.nip} onChange={(e) => {let buff = form; buff["nip"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Brand ID:&nbsp;</label>
                    <input type="text" value={form.brandId} onChange={(e) => {let buff = form; buff["brandId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Address:&nbsp;</label>
                    <input type="text" value={form.address} onChange={(e) => {let buff = form; buff["address"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>City:&nbsp;</label>
                    <input type="text" value={form.city} onChange={(e) => {let buff = form; buff["city"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => {let buff = form; buff["adminId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    else if(type==="notes"){
        return(
            <div className="PostFormNote">
                <form onSubmit={sendForm}>
                    <label>Content:&nbsp;</label>
                    <input type="text" value={form.content} onChange={(e) => {let buff = form; buff["content"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Company ID:&nbsp;</label>
                    <input type="text" value={form.companyId} onChange={(e) => {let buff = form; buff["companyId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => {let buff = form; buff["adminId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    else if(type==="contact-people"){
        return(
            <div className="PostFormContact">
                <form onSubmit={sendForm}>
                    <label>Name:&nbsp;</label>
                    <input type="text" value={form.name} onChange={(e) => {let buff = form; buff["name"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Surname:&nbsp;</label>
                    <input type="text" value={form.surname} onChange={(e) => {let buff = form; buff["surname"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Phone:&nbsp;</label>
                    <input type="text" value={form.phone} onChange={(e) => {let buff = form; buff["phone"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>E-mail:&nbsp;</label>
                    <input type="text" value={form.email} onChange={(e) => {let buff = form; buff["email"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Position:&nbsp;</label>
                    <input type="text" value={form.position} onChange={(e) => {let buff = form; buff["position"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Company ID:&nbsp;</label>
                    <input type="text" value={form.companyId} onChange={(e) => {let buff = form; buff["companyId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => {let buff = form; buff["adminId"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    else if(type==="brands"){
        return(
            <div className="PostFormBrand">
                <form onSubmit={sendForm}>
                    <label>Name:&nbsp;</label>
                    <input type="text" value={form.name} onChange={(e) => {let buff = form; buff["name"] = e.target.value; setForm(buff)}}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>POST</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    return null;
}

export default PostForm;