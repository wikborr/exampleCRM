import React,{useEffect,useState} from 'react';
import '../App.css';
import No from '../ModData/No';
import BrandModDataPiece from './BrandModPiece';
import CUDButton from '../ModData/CUDButton';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function BrandModDataPage(props) {
  const token = props.token;
  const role = props.role;
  const [brands, setBrands] = useState([]);
  const [effect, setEffect] = useState(true);

  let navigate = useNavigate();
  useEffect(() => {
    const getAPI = async () => {
      var response;
      try{
        response = await api.get('/mod/brands', {headers: {"Authorization" : `Bearer ${token}`}});
      }
      catch(e){
        navigate("/logout");
      }
      const data = response.data;
      setBrands(data);
    }
    getAPI();
  }, [effect, token, navigate]);

  if(role>2){
    return( <No /> );
  }

  return (
    <div className="BrandModDataPage">
      <h1>Brands:</h1>
      <CUDButton effect={effect} refresh={setEffect} type={"brands"}  req={"POST"} token={token} roleGlobal={role}/>
      {brands.map(brand => (
        <BrandModDataPiece token={token} refresh={setEffect} effect={effect} json={brand}
        name={brand.name}
        key={brand.id}
        id={brand.id}/>
      ))}
    </div>
  );
  
}

export default BrandModDataPage;