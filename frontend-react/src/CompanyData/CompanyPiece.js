import React from "react";
import CUDButton from "../ModData/CUDButton";

function CompanyDataPiece(props){
    const token = props.token;
    const role = props.role;

    if(role>2){
        return(
            <div className="ContactPeoplePiece">
                <h2>{props.name}</h2>
                <hr />
                <b>
                    <p>NIP: {props.nip}</p>
                    <p>Brand: {props.brand}</p>
                    <p>Address: {props.address}</p>
                    <p>City: {props.city}</p>
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
            <h2>{props.name}</h2>
            <hr />
            <b>
                <p>NIP: {props.nip}</p>
                <p>Brand: {props.brand}</p>
                <p>Address: {props.address}</p>
                <p>City: {props.city}</p>
            </b>
            <hr />
            <i>
                <small>id: {props.id}</small><br />
                <small>adminId: {props.adminId}</small>
            </i>
            <hr />
            <div className="UD">
                <CUDButton effect={props.effect} refresh={props.refresh} type={"companies"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
                <CUDButton effect={props.effect} refresh={props.refresh} type={"companies"}  req={"DELETE"} token={token} id={props.id} json={props.json}/>
            </div>
        </div>
    );
}

export default CompanyDataPiece;