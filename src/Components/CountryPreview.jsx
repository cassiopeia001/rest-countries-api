import { useOutletContext } from "react-router-dom"

export default function CountryPreview ({details}){
    const darkMode= useOutletContext()
    return (
        <div className={`flex flex-col rounded-md ${darkMode? "bg-Blue-900": "bg-White"} shadow-lg w-full`}>
            <img className="w-full rounded-t-md h-40 object-cover" src={details.flag} alt="country flag" />
            <div className="flex flex-col justify-center gap-2 p-5">
                <h1 className="font-extrabold text-xl break-words mb-2">{details.name}</h1>
                <p><span className="font-bold">Population: </span>{details.population.toLocaleString()}</p>
                <p><span className="font-bold">Region: </span>{details.region}</p>
                <p><span className="font-bold">Capital: </span>{details.capital}</p>
            </div>
        </div>
    )
}