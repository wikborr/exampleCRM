import { useNavigate } from "react-router-dom";

function Logout(props){
    const role = props.role;
    const setToken = props.setToken;
    const setId = props.setId;
    const setRole = props.setRole;

    if(role<4){
      setId(0);
      setToken("");
      setRole(4);
    }
    let navigate = useNavigate();
    navigate("/");
    return null;
}

export default Logout;