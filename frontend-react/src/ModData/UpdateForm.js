import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function UpdateForm(props){
    const token = props.token;
    const id = props.id;
    const type = props.type;
    const refresh = props.refresh;
    const effect = props.effect;

    const [form, setForm] = useState(props.json);
    const [confirm, setConfirm] = useState("");

    let navigate = useNavigate();
    const sendForm = async e => {
        e.preventDefault();
        var response;
        console.log(form);
        if(type==="usersAdmin"){
            try{
                response = await api.put(`/admin/users/${id}/`, form, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        else{
            try{
                response = await api.put(`/mod/${type}/${id}/`, form, {headers: {"Authorization" : `Bearer ${token}`}});
            }
            catch(e){
                navigate("/logout");
            }
        }
        console.log(response);
        if(response.status === 201 ||  response.status === 200){
            setConfirm("Update successfull!");
            refresh(!effect);
        }
        else{
            setConfirm("Update unsuccessful!");
        }
    }

    if(type==="users"){
        return(
            <div className="PostFormUser">
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
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
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
                    <label>Role ID:&nbsp;</label>
                    <input type="text" value={form.roleId} onChange={(e) => setForm(Object.assign({},form,{"roleId":e.target.value}))}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
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
                    <input type="text" value={form.name} onChange={(e) => setForm(Object.assign({},form,{"name":e.target.value}))}/>
                    <br />
                    <label>NIP:&nbsp;</label>
                    <input type="text" value={form.nip} onChange={(e) => setForm(Object.assign({},form,{"nip":e.target.value}))}/>
                    <br />
                    <label>Brand ID:&nbsp;</label>
                    <input type="text" value={form.brandId} onChange={(e) => setForm(Object.assign({},form,{"brandId":e.target.value}))}/>
                    <br />
                    <label>Address:&nbsp;</label>
                    <input type="text" value={form.address} onChange={(e) => setForm(Object.assign({},form,{"address":e.target.value}))}/>
                    <br />
                    <label>City:&nbsp;</label>
                    <input type="text" value={form.city} onChange={(e) => setForm(Object.assign({},form,{"city":e.target.value}))}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => setForm(Object.assign({},form,{"adminId":e.target.value}))}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
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
                    <input type="text" value={form.content} onChange={(e) => setForm(Object.assign({},form,{"content":e.target.value}))}/>
                    <br />
                    <label>Company ID:&nbsp;</label>
                    <input type="text" value={form.companyId} onChange={(e) => setForm(Object.assign({},form,{"companyId":e.target.value}))}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => setForm(Object.assign({},form,{"adminId":e.target.value}))}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
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
                    <input type="text" value={form.name} onChange={(e) => setForm(Object.assign({},form,{"name":e.target.value}))}/>
                    <br />
                    <label>Surname:&nbsp;</label>
                    <input type="text" value={form.surname} onChange={(e) => setForm(Object.assign({},form,{"surname":e.target.value}))}/>
                    <br />
                    <label>Phone:&nbsp;</label>
                    <input type="text" value={form.phone} onChange={(e) => setForm(Object.assign({},form,{"phone":e.target.value}))}/>
                    <br />
                    <label>E-mail:&nbsp;</label>
                    <input type="text" value={form.email} onChange={(e) => setForm(Object.assign({},form,{"email":e.target.value}))}/>
                    <br />
                    <label>Position:&nbsp;</label>
                    <input type="text" value={form.position} onChange={(e) => setForm(Object.assign({},form,{"position":e.target.value}))}/>
                    <br />
                    <label>Company ID:&nbsp;</label>
                    <input type="text" value={form.companyId} onChange={(e) => setForm(Object.assign({},form,{"companyId":e.target.value}))}/>
                    <br />
                    <label>Admin ID:&nbsp;</label>
                    <input type="text" value={form.adminId} onChange={(e) => setForm(Object.assign({},form,{"adminId":e.target.value}))}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
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
                    <input type="text" value={form.name} onChange={(e) => setForm(Object.assign({},form,{"name":e.target.value}))}/>
                    <br />
                    <br />
                    <button className="page-button-button" type='submit'>UPDATE</button>
                    &nbsp;&nbsp;
                    <input className="input-output" type="text" value={confirm} disabled/>
                </form>
            </div>
        );
    }
    return null;
}

export default UpdateForm;