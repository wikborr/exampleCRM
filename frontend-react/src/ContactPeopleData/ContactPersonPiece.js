import React from "react";
import CUDButton from "../ModData/CUDButton";

function ContactPersonDataPiece(props){
    const token = props.token;
    const role = props.role;

    if(role>2){
        return(
            <div className="ContactPeoplePiece">
                <h2>{props.name} {props.surname}</h2>
                <hr />
                <b>
                    <p>Company: {props.company}</p>
                    <p>Position: {props.position}</p>
                    <p>Phone number: {props.phone}</p>
                    <p>E-mail Address: {props.email}</p>
                </b>
                <hr />
                <i>
                    <small>id: {props.id}</small><br />
                    <small>adminId: {props.adminId}</small>
                </i>
                
            </div>
        );
    }
    return(
        <div className="ContactPeoplePiece">
            <h2>{props.name} {props.surname}</h2>
            <hr />
            <b>
                <p>Company: {props.company}</p>
                <p>Position: {props.position}</p>
                <p>Phone number: {props.phone}</p>
                <p>E-mail Address: {props.email}</p>
            </b>
            <hr />
            <i>
                <small>id: {props.id}</small><br />
                <small>adminId: {props.adminId}</small>
            </i>
            <hr />
            <div className="UD">
                <CUDButton effect={props.effect} refresh={props.refresh} type={"contact-people"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
                <CUDButton effect={props.effect} refresh={props.refresh} type={"contact-people"}  req={"DELETE"} token={token} id={props.id} json={props.json}/>
            </div>
        </div>
    );
}

export default ContactPersonDataPiece;