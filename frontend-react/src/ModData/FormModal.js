import React from "react";
import PostForm from "./PostForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

function FormModal(props){
    const token = props.token;
    const id = props.id;
    const req = props.req;
    const type = props.type;
    const show = props.show;

    if(show===false){
        return null;
    }
    
    if(req==="POST"){
        return(
            <div className="FormModal">
                <PostForm effect={props.effect} refresh={props.refresh} type={type} token={token} />
            </div>
        );
    }
    else if(req==="UPDATE"){
        return(
            <div className="FormModal">
                <UpdateForm effect={props.effect} refresh={props.refresh} type={type} token={token} id={id} json={props.json}/>
            </div>
        );
    }
    else if(req==="DELETE"){
        return(
            <div className="FormModal">
                <DeleteForm effect={props.effect} refresh={props.refresh} type={type} token={token} id={id} />
            </div>
        );
    }
    return null;
}

export default FormModal;