import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

function MyNavbar() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className=" bg-purple-400 w-screen py-5">
         <div className=" overflow-hidden ">
            <div className="flex relative items-center justify-around z-50 w-screen space-x-[10vw] ">
               <h1 className=" text-4xl font-bold">
                  <a href="/">RIDE&SELL</a>
               </h1>
               <div className=" block md:hidden ">
                  <Hamburger
                     color="white"
                     toggled={isOpen}
                     toggle={setIsOpen}
                     onToggle={(toggled) => {
                        if (toggled) {
                           document.body.classList.add("fixed");
                        } else {
                           document.body.classList.remove("fixed");
                        }
                     }}
                  />
               </div>
               <div className=" hidden md:block ">
                  <div>
                     <ul className="navList">
                        <li>
                           <button>Cerca Auto</button>
                        </li>
                        <li>
                           <button>Inserisci Auto</button>
                        </li>
                        <li>
                           <button>Inserisci Auto</button>
                        </li>
                        <li>
                           <button id="loginButton">Login</button>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className=" block md:hidden ">
               <div
                  className={`${
                     isOpen ? "top-16" : "top-[-100vh]"
                  } left-0 absolute bg-purple-400 w-screen flex items-center flex-col ease-in-out duration-300 py-8`}
               >
                  <ul className="navMobList">
                     <li>
                        <button>Cerca Auto</button>
                     </li>
                     <li>
                        <button>Inserisci Auto</button>
                     </li>
                     <li>
                        <button>Inserisci Auto</button>
                     </li>
                     <li>
                        <button id="loginButton">Login</button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default MyNavbar;
