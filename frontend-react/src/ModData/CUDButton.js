import React,{useState} from "react";
import FormModal from "./FormModal";

function CUDButton(props){
    const token = props.token;
    const id = props.id;
    const req = props.req;
    const type = props.type;
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(req);

    const showModal = e => {
        e.preventDefault();
        if(hide==="DON'T "+req){
            setHide(req);
        }
        else{
            setHide("DON'T "+req);
        }
        setShow(!show);
    }
    if(req==="POST"){
        return(
            <div className="CUDButton">
                <form onSubmit={showModal}>
                    <button className="CUDButton-post" type='submit'>{hide}</button>
                </form>
                    <FormModal effect={props.effect} refresh={props.refresh} show={show} req={req} type={type} token={token}/>
            </div>
        );
    }
    else if(req==="UPDATE"){
        return(
            <div className="CUDButton">
                <form onSubmit={showModal}>
                    <button className="CUDButton-update" type='submit'>{hide}</button>
                </form>
                    <FormModal effect={props.effect} refresh={props.refresh} show={show} req={req} type={type} token={token} id={id} json={props.json}/>
            </div>
        );
    }
    else if(req==="DELETE"){
        return(
            <div className="CUDButton">
                <form onSubmit={showModal}>
                    <button className="CUDButton-delete" type='submit'>{hide}</button>
                </form>
                    <FormModal effect={props.effect} refresh={props.refresh} show={show} req={req} type={type} token={token} id={id} />
            </div>
        );
    }
    return null;
}

export default CUDButton;