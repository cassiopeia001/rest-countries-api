import { useEffect, useState, useContext } from "react"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import {CountriesContext} from '../Components/CountriesContext'
import CountryPreview from "../Components/CountryPreview"

export default function Home(){
    
    const darkMode= useOutletContext()

    const countriesList= useContext(CountriesContext);
    const navigate= useNavigate();

    const [displayedCountries, setDisplayedCountries]= useState([]);
    const [selectedRegion, setSelectedRegion]= useState("");
    const [searchInput, setSearchInput]= useState("");
    
    useEffect(()=>{

        if(countriesList)
            setDisplayedCountries(countriesList)
        
    },[countriesList])

    useEffect(() => {
        if (displayedCountries) {
            console.log('Updated list:', displayedCountries);
        }
        }, [displayedCountries]);

    function handleRegionChange(e){
        
       const region= e.target.value 
       setSelectedRegion(region)

       const filteredCountryList= countriesList.filter(c=>c.region===region)
       setDisplayedCountries(filteredCountryList)
    }    
    function handleInputSearch(e){

        e.preventDefault()
        const countryName= searchInput.trim().toLowerCase();
        const foundCountry= countriesList.find((c)=> c.name.common.toLowerCase()===countryName);
        const countryCode= foundCountry.cca3;
        navigate(`${countryCode}`)
    }

    return(
        <div className="p-5 md:pt-7 md:px-15">
            <div className="md:flex md:justify-between md:items-center md:gap-2">

                <form onSubmit={handleInputSearch}
                    className={`w-full flex items-center gap-6 py-4 pl-8 rounded-md shadow-lg mb-10 md:w-md md:mb-0 ${darkMode? "bg-Blue-900": "bg-White"}`}>
                    <img className="h-4" src="/images/search-outline.svg" alt="search" />
                    <input className={`outline-0 w-full ${darkMode? "placeholder:text-White text-White": "placeholder:text-Grey-400 text-Grey-400"}`} 
                            type="search" name="search" id="search" 
                            placeholder="Search for a country..." 
                            onChange={(e)=>setSearchInput(e.target.value)}/>
                </form>

                <div className="w-52 relative font-nunito">
                    <select
                    value={selectedRegion}
                    onChange={handleRegionChange}
                     id="region"
                     className={`w-full h-full ${darkMode? "bg-Blue-900": "bg-White"} appearance-none relative pl-5 py-4 rounded-md shadow-lg focus:outline-none hover:cursor-pointer`}>
                        <option value="" hidden >Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Americas">America</option>
                    </select>
                    <img className="h-3 absolute top-1/2 transform -translate-y-1/2  right-5 z-10 pointer-events-none" src="/images/chevron-down-outline.svg" alt="arrow down" />
                </div>
            </div>
           {countriesList &&
             <div className="flex items-center justify-center w-full">
                <div className="grid grid-cols-1  mt-10 gap-10 md:mt-15 sm:gridcols md:grid-cols-3 lg:grid-cols-4">
                    {
                        displayedCountries.map((country)=>{

                            let countryCode= country.cca3
                            let details= {
                                flag: country.flags.png,
                                name: country.name.common,
                                population: country.population, 
                                region: country.region,
                                capital: country.capital?.[0] || "No capital"
                            }
                            return <Link to={countryCode} key={countryCode}>
                                        <CountryPreview details={details} />
                                    </Link>
                        })
                    }
                </div>
            </div>} 

        </div>
    )
}