import { useState,useEffect } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Country from './Pages/Country'
import Layout from './Pages/Layout'
import NotFound from './Pages/NotFound'
import {CountriesContext} from './Context/CountriesContext'

function App() {

  const [countriesList, setCountriesList]= useState(null)

  useEffect(()=>{

    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3')
    .then(response=>response.json())
    .then(data=>setCountriesList(data))
    .catch(error=>console.log(error))

  }, []);
  console.log(countriesList)

    return(

      <CountriesContext.Provider value={countriesList}>
        <div className='font-nunito text-sm text-Grey-950'>

          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element= {<Home />} />
              <Route path=':name' element={<Country />} />
            </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes> 
        </div>
      </CountriesContext.Provider>
    )

}

export default App
