import { useEffect, useState, useContext, useMemo } from "react"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import {CountriesContext} from '../Context/CountriesContext'
import CountryPreview from "../Components/CountryPreview"
import {motion, AnimatePresence} from "motion/react"

export default function Home(){
    
    const darkMode= useOutletContext();

    const countriesList= useContext(CountriesContext);
    const navigate= useNavigate();

    const [selectedRegion, setSelectedRegion]= useState("");
    const [searchInput, setSearchInput]= useState("");

    const displayedCountries= useMemo (()=> {

        if(!countriesList) return []

        let filteredCountries= countriesList

        if (selectedRegion){ 
            filteredCountries= filteredCountries.filter(c=>c.region===selectedRegion)
        }
        if (searchInput) { 
            filteredCountries= filteredCountries.filter(c=>c.name.common.toLowerCase().includes(searchInput))
        }
        
        return filteredCountries

    },[countriesList, selectedRegion, searchInput]);

    return(
        <div className="p-5 md:pt-7 md:px-8 lg:px-11 xl:px-16">
            <div className="md:flex md:justify-between md:items-center md:gap-2">

                <form onSubmit={(e)=>e.preventDefault()}
                    className={`w-full flex items-center gap-6 py-4 pl-8 rounded-md shadow-lg mb-10 md:w-md md:mb-0 ${darkMode? "bg-Blue-900": "bg-White"}`}>
                    <svg style={{color: `${darkMode? "white": "var(--color-Grey-400) "}`}} className="h-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512">
                    <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></svg>
                    <label htmlFor="search" className="sr-only">search for a country</label>
                    <input className={`outline-0 w-full ${darkMode? "placeholder:text-White text-White": "placeholder:text-Grey-400 text-Grey-400"}`} 
                            type="search" name="search" 
                            id="search" 
                            placeholder="Search for a country..." 
                            onChange={(e)=> setSearchInput(e.target.value.toLowerCase())}/>
                </form>

                <div className="w-52 relative font-nunito">
                    <select
                    value={selectedRegion}
                    onChange={(e)=>setSelectedRegion(e.target.value)}
                     id="region"
                     aria-label="select a region"
                     className={`w-full h-full ${darkMode? "bg-Blue-900": "bg-White"} appearance-none relative pl-5 py-4 rounded-md shadow-lg focus:outline-none hover:cursor-pointer`}>
                        <option value="" hidden >Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Americas">America</option>
                    </select>
                    <svg style={{color: `${darkMode? "white": "var(--color-Grey-950) "}`}} className="h-3 absolute top-1/2 transform -translate-y-1/2  right-5 z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
                    </svg>
                </div>
            </div>
             <div className="flex items-center justify-center md:justify-normal w-full">
                {displayedCountries.length===0 && searchInput ?
                    (   
                        <AnimatePresence>
                            <motion.div 
                                initial={{opacity:0 }}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0}}
                                className="flex items-center justify-center h-full w-full" role="status" aria-live="polite">
                                    <p className="mt-30">No results found. Please provide a valid country name</p>
                            </motion.div>
                        </AnimatePresence>
                    ):
                    (
                        <div className="grid grid-cols-1  mt-10 gap-10 md:mt-15 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <AnimatePresence mode="wait">
                                { displayedCountries.map((country)=>{

                                        let countryCode= country.cca3
                        
                                        let details= {
                                            flag: country.flags.png,
                                            name: country.name.common,
                                            population: country.population, 
                                            region: country.region,
                                            capital: country.capital?.[0] || "No capital"
                                        }
                                        return ( 
                                        <motion.div
                                            key={countryCode}
                                            initial={{opacity:0 }}
                                            animate={{ opacity: 1}}
                                            exit={{ opacity: 0}}
                                            transition={{ duration: 0.2 }}
                                            className="hover:scale-105 transition-transform duration-300 ease-in-out">
                                            <Link  to={country.name.common} key={countryCode}
                                                >
                                                    <CountryPreview details={details}  />
                                            </Link>
                                        </motion.div>)
                                    })}
                                    </AnimatePresence>
                            </div> 
                                  
                    )} 
                        
                    </div>
        </div>
    )
}