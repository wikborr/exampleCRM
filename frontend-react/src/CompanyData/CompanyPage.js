import React,{useEffect,useState} from 'react';
import '../App.css';
import No from '../ModData/No';
import CUDButton from '../ModData/CUDButton';
import CompanyDataPiece from "./CompanyPiece";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

function CompanyDataPage(props) {
  const token = props.token;
  const role = props.role;
  const [effect, setEffect] = useState(true);

  const [companies, setCompanies] = useState([]);
  const [brands, setBrands] = useState([]);

  const [pages, setPages] = useState([null,null]);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [queryPage, setQueryPage] = useState("1");
  const [queryBrand, setQueryBrand] = useState("");
  const [queryCity, setQueryCity] = useState("");
  
  let navigate = useNavigate();
  useEffect(() => {
    const getAPI = async () => {
      var response;
      try{
        response = await api.get('brands', {headers: {"Authorization" : `Bearer ${token}`}});
      }
      catch(e){
        navigate("/logout");
      }
      const data = response.data;
      setBrands(data);
      const response2 = await api.get('companies', { params: {page: queryPage, brand: queryBrand, city: queryCity}, headers: {"Authorization" : `Bearer ${token}`}});
      const data2 = response2.data;
      var prev = data2.previous;
      if(prev!=null){
        prev = prev.charAt(prev.length-1)
        if (prev => {return !(/\d/.test(prev));}) {
          prev = "1";
        }
      }
      var next = data2.next;
      if(next!=null){
        next = next.charAt(next.length-1)
      }
      setPages([prev, next]);
      setCompanies(data2.results);
    }
    getAPI();
  }, [queryPage, queryBrand, queryCity, effect, token, navigate]);

  function key2name(key, objects){
    for(const i of objects){
      if(i.id === key){
        return i.name;
      }
    }
  }

  const updateSearchBrand = e => {
    setSearchBrand(e.target.value);
  }
  const updateSearchCity = e => {
    setSearchCity(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQueryBrand(searchBrand);
    setQueryCity(searchCity);
  }
  const getPrevPage = e => {
    e.preventDefault();
    if (pages[0]!=null){
      setQueryPage(pages[0]);
    }
  }
  const getNextPage = e => {
    e.preventDefault();
    if (pages[1]!=null){
      setQueryPage(pages[1]);
    }
  }

  if(role>3){
    return( <No /> );
  }

  if(role>2){
    return (
      <div className="CompanyDataPage">
        <h1>Companies:</h1>
        <br />
        <form class="company-search" onSubmit={getSearch}>
          <label>Brand name:&nbsp;</label>
          <input class="company-search-bar" type="text" value={searchBrand} onChange={updateSearchBrand}/>
          <label>&nbsp;&nbsp;City name:&nbsp;</label>
          <input class="company-search-bar" type="text" value={searchCity} onChange={updateSearchCity}/>
          &nbsp;&nbsp;
          <button class="company-search-button" type='submit'>Filter</button>
        </form>
        <br />
        <div class="PrevNext">
          <form class="page-button" onSubmit={getPrevPage}>
            <button class="page-button-button" type='submit' >&lt;&lt;</button>
          </form>
          &nbsp;Page {queryPage}&nbsp;
          <form class="page-button" onSubmit={getNextPage}>
            <button class="page-button-button" type='submit'>&gt;&gt;</button>
          </form>
        </div>
        {companies.map(company => (
          <CompanyDataPiece role={role}
          name={company.name}
          key={company.id}
          brand={key2name(company.brandId, brands)} 
          nip={company.nip} 
          address={company.address}
          city={company.city}
          id={company.id}
          adminId={company.adminId}/>
        ))}
      </div>
    );
  }
  return (
    <div className="CompanyDataPage">
      <h1>Companies:</h1>
      <CUDButton effect={effect} refresh={setEffect} type={"companies"}  req={"POST"} token={token} roleGlobal={role}/>
      <br />
      <form class="company-search" onSubmit={getSearch}>
        <label>Brand name:&nbsp;</label>
        <input class="company-search-bar" type="text" value={searchBrand} onChange={updateSearchBrand}/>
        <label>&nbsp;&nbsp;City name:&nbsp;</label>
        <input class="company-search-bar" type="text" value={searchCity} onChange={updateSearchCity}/>
        &nbsp;&nbsp;
        <button class="company-search-button" type='submit'>Filter</button>
      </form>
      <br />
      <div class="PrevNext">
        <form class="page-button" onSubmit={getPrevPage}>
          <button class="page-button-button" type='submit' >&lt;&lt;</button>
        </form>
        &nbsp;Page {queryPage}&nbsp;
        <form class="page-button" onSubmit={getNextPage}>
          <button class="page-button-button" type='submit'>&gt;&gt;</button>
        </form>
      </div>
      {companies.map(company => (
        <CompanyDataPiece token={token} refresh={setEffect} effect={effect} role={role} json={company}
        name={company.name}
        key={company.id}
        brand={key2name(company.brandId, brands)} 
        nip={company.nip} 
        address={company.address}
        city={company.city}
        id={company.id}
        adminId={company.adminId}/>
      ))}
    </div>
  );
}

export default CompanyDataPage;