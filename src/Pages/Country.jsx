import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, Navigate, useOutletContext } from "react-router-dom";
import {CountriesContext} from '../Context/CountriesContext'
import {motion, AnimatePresence} from 'motion/react'
export default function Country(){

    const darkMode= useOutletContext();

    const countriesList= useContext(CountriesContext)
    let {name}= useParams();
    let navigate= useNavigate()

    const[countryInfo, setCountryInfo]= useState();

    useEffect(()=>{

        const fetchCountry = async () => {
            try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            const data = await res.json();
            setCountryInfo(data);
            } catch (e) {
            console.error(e);
            }
        };

        fetchCountry();
    }, [name]);

    const country= countryInfo?.[0];

    return (

        <AnimatePresence>
        <motion.div
            initial={{opacity:0 }}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="px-5 py-8 text-base">
            <button className={`${darkMode ? "bg-Blue-900": "bg-White"} shadow-lg px-6 py-2 rounded-sm mb-10 hover:cursor-pointer hover:scale-105 transition-transform duration-200`}
                    aria-label="click to go back"
                    onClick={()=>navigate(-1)}>
                        <svg style={{color: `${darkMode? "white": "var(--color-Grey-400) "}`}}  className="inline-block align-middle w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/>
                        </svg>
                <span className="inline-block ml-2">Back</span>
                
            </button>
            {countryInfo&&
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:px-10">
                <div className="w-full flex justify-center">
                    <img className="w-full max-w-xl" src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
                </div>
                <div className="flex flex-col gap-5 md:w-full">
                    <h1 className="text-2xl font-extrabold mb-4">{country.name.common}</h1>
                    <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                            <dl className="flex flex-col gap-2">
                                <div>
                                    <dt className="font-bold inline">Native Name: </dt>
                                    <dd className="inline">{Object.values(country.name.nativeName)[0].common}</dd>
                                </div>
                                <div>
                                    <dt className="font-bold inline">Population: </dt>
                                    <dd className="inline">{country.population.toLocaleString()}</dd>
                                </div>
                                <div>
                                    <dt className="font-bold inline">Region: </dt>
                                    <dd className="inline">{country.region}</dd>
                                </div>
                                <div>
                                    <dt className="font-bold inline">Sub Region: </dt>
                                    <dd className="inline">{country.subregion}</dd>
                                </div>
                                <div>
                                    <dt className="font-bold inline">Capital: </dt>
                                    <dd className="inline">{country.capital?.[0]}</dd>
                                </div>
                            </dl>
                        
                        <dl className="flex flex-col gap-2">
                            <div>
                                <dt className="font-bold inline">Top Level Domain: </dt>
                                <dd className="inline">{country.altSpellings[0]}</dd>
                            </div>
                            <div>
                                <dt className="font-bold inline">Currencies: </dt>
                                <dd className="inline">
                                {Object.values(country.currencies).map(c => c.name).join(', ')}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-bold inline">Languages: </dt>
                                <dd className="inline">
                                {Object.values(country.languages).join(', ')}
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <p className="font-bold text-lg">Border Countries: </p>

                        {
                            !country.borders ? ( <span>None</span>) : (
                                <div className="flex flex-wrap gap-2">

                                {country.borders?.map((b,i)=>{
                                    
                                    const foundCountry= countriesList.find(c=> c.cca3===b);
                                    if (!foundCountry) return null

                                    return <Link className={`${darkMode? "bg-Blue-900": "bg-white"} shadow-lg mr-2 px-4 py-3 rounded-md`} key={i} to={`/${foundCountry.name.common}`} >{foundCountry.name.common} </Link>
                                }) }
                                </div>)
                        }
                        
                    </div>
                </div>
            </div>}
        </motion.div> 
        </AnimatePresence>
    )
}