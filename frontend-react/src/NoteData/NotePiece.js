import React from "react";
import CUDButton from "../ModData/CUDButton";

function NoteDataPiece(props){
    const token = props.token;
    const role = props.role;

    if(role>2){
        return(
            <div className="NotePiece">
                <h2>Company: {props.company}</h2>
                <hr />
                
                <p>{props.content}</p>
                
                <hr />
                <i>
                    <small>id: {props.id}</small><br />
                    <small>adminId: {props.adminId}</small>
                </i>
                
            </div>
        );
    }
    return(
        <div className="NotePiece">
            <h2>Company: {props.company}</h2>
            <hr />
            
            <p>{props.content}</p>
            
            <hr />
            <i>
                <small>id: {props.id}</small><br />
                <small>adminId: {props.adminId}</small>
            </i>
            <hr />
            <div className="UD">
                <CUDButton effect={props.effect} refresh={props.refresh} type={"notes"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
                <CUDButton effect={props.effect} refresh={props.refresh} type={"notes"}  req={"DELETE"} token={token} id={props.id} json={props.json}/>
            </div>
        </div>
    );
}

export default NoteDataPiece;