import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, Navigate, useOutletContext } from "react-router-dom";
import {CountriesContext} from '../Components/CountriesContext'
export default function Country(){

    const darkMode= useOutletContext();

    const countriesList= useContext(CountriesContext)
    let {code}= useParams();
    let navigate= useNavigate()

    const[countryInfo, setCountryInfo]= useState()

    useEffect(()=>{

        if(countriesList){
            const country= countriesList.find(c=> c.cca3===code);
            setCountryInfo(country);
        }

    }, [countriesList, code])

    return (
        <div className="px-5 py-8 text-base">
            <button className={`${darkMode ? "bg-Blue-900": "bg-White"} shadow-lg px-6 py-2 rounded-sm mb-10 hover:cursor-pointer`}
                    onClick={()=>navigate(-1)}>
                <img src="/rest-countries-api/images/arrow-back-outline.svg" alt="arrow back"  className="inline-block align-middle w-4 h-4"/>
                <span className="inline-block ml-2">Back</span>
                
            </button>
            {countryInfo&&
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:px-10">
                <div className="w-full flex justify-center">
                    <img className="w-full max-w-xl" src={countryInfo.flags.png} alt="" />
                </div>
                <div className="flex flex-col gap-5 md:w-full">
                    <h1 className="text-2xl font-extrabold mb-4">{countryInfo.name.common}</h1>
                    <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                        <div className="flex flex-col gap-2">
                            <p><span className="font-bold">Native Name: </span>{Object.values(countryInfo.name.nativeName)[0].common}</p>
                            <p><span className="font-bold">Population: </span>{countryInfo.population.toLocaleString()}</p>
                            <p><span className="font-bold">Region: </span>{countryInfo.region}</p>
                            <p><span className="font-bold">Sub Region: </span>{countryInfo.subregion}</p>
                            <p><span className="font-bold">Capital: </span>{countryInfo.capital[0]}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p><span className="font-bold">Top Level Domain: </span>{countryInfo.altSpellings[0]}</p>
                            <div className="flex gap-1">
                                <span className="font-bold">Currencies: </span>
                                <span>
                                {
                                    Object.values(countryInfo.currencies).map(c => c.name).join(', ')
                                }
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">Languages: </span>
                                <span>
                                {
                                    Object.values(countryInfo.languages).map(l=>l).join(', ')
                                }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <p className="font-bold text-lg">Border Countries: </p>

                        
                            {
                                !countryInfo.borders ? ( <span>None</span>) : (
                                    <div className="flex flex-wrap gap-2">

                                   {countryInfo?.borders?.map((b,i)=>{
                                        
                                        const foundCountry= countriesList.find(c=> c.cca3===b);
                                        if (!foundCountry) return null;

                                        return <Link className={`${darkMode? "bg-Blue-900": "bg-white"} shadow-lg mr-2 px-4 py-3 rounded-md`} key={i} to={`/${b}`} >{foundCountry.name.common} </Link>
                                    }) }
                                    </div>)
                            }
                        
                    </div>
                </div>
            </div>}
        </div> 
    )
}