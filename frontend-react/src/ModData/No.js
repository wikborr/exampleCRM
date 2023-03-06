import { useNavigate } from "react-router-dom";

function No(){
    let navigate = useNavigate();
    navigate("/");
    return null;
}

export default No;