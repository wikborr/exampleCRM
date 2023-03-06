import React from "react";
import CUDButton from "../ModData/CUDButton";

function UserDataPiece(props){
    const token = props.token;
    const role = props.roleGlobal;
    
    if(role>2){
        return(
            <div className={props.class}>
                <h2>{props.name} {props.surname}</h2>
                <hr />
                <b>
                    <p>Birthdate: {props.dateOfBirth}</p>
                    <p>Rank: {props.role}</p>
                </b>
                <hr />
                <small>id: {props.id}</small>
            </div>
        );
    }
    if(role>1){
        return(
            <div className={"Mod"+props.class}>
                <h2>{props.name} {props.surname}</h2>
                <hr />
                <b>
                    <p>Birthdate: {props.dateOfBirth}</p>
                    <p>Rank: {props.role}</p>
                </b>
                <hr />
                <small>id: {props.id}</small>
                <hr />
                <CUDButton effect={props.effect} refresh={props.refresh} type={"users"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
            </div>
        );
    }
    if(role===1){
        return(
            <div className={"Admin"+props.class}>
                <h2>{props.name} {props.surname}</h2>
                <hr />
                <b>
                    <p>Birthdate: {props.dateOfBirth}</p>
                    <p>Rank: {props.role}</p>
                    <p>Login: {props.login}</p>
                </b>
                <hr />
                <small>id: {props.id}</small>
                <hr />
                <div className="UD">
                    <CUDButton effect={props.effect} refresh={props.refresh} type={"usersAdmin"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
                    <CUDButton effect={props.effect} refresh={props.refresh} type={"usersAdmin"}  req={"DELETE"} token={token} id={props.id} json={props.json}/>
                </div>
            </div>
        );
    }
    return null;
}

export default UserDataPiece;