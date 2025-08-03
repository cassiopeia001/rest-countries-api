import { useState } from "react"
import { Outlet } from "react-router-dom"
export default function Layout (){

    const[darkMode, setDarkMode]= useState(false);

    return (
        <>
            <header className={`flex justify-between items-center px-5 py-9 ${darkMode ? 'bg-Blue-900 text-White' : 'bg-White text-Grey-950'} shadow-sm z-10 relative md:px-15`}>
                <h1 className="text-xl font-extrabold ">Where in the world?</h1>
                <button className="flex items-center justify-center gap-2 font-semibold text-base hover:cursor-pointer"
                        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                        onClick={()=>{setDarkMode(prev=> !prev)}}>
                    <img className="h-4" src={  darkMode? "/rest-countries-api/images/moon.png": "/rest-countries-api/images/moon-outline.svg"} alt="theme switcher" />     
                    Dark Mode
                </button>
            </header>
            <main className={`min-h-screen w-full ${darkMode? "bg-Blue-950 text-White":"bg-Grey-50 text-Grey-950"} transition-colors duration-300 ease-in-out`}>
                <Outlet context={darkMode} />
            </main>
        </>
    )   
}