import React from "react";
import CUDButton from "../ModData/CUDButton";

function BrandModDataPiece(props){
    const token = props.token;

    return(
        <div className="BrandModPiece">
            <h2>{props.name}</h2>
            <hr />
            <i>
                <small>id: {props.id}</small><br />
            </i>
            <hr />
            <div className="UD">
                <CUDButton effect={props.effect} refresh={props.refresh} type={"brands"}  req={"UPDATE"} token={token} id={props.id} json={props.json}/>
                <CUDButton effect={props.effect} refresh={props.refresh} type={"brands"}  req={"DELETE"} token={token} id={props.id} json={props.json}/>
            </div>
        </div>
    );
}

export default BrandModDataPiece;