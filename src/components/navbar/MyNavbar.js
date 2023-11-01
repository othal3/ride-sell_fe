import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

function MyNavbar() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className=" bg-purple-400 h-1/3 w-screen pt-5">
         <div className=" overflow-hidden ">
            <div className=" absolute flex items-center justify-around z-50 w-screen space-x-[10vw]">
               <h1 className=" text-4xl font-bold">RIDE&SELL</h1>
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
                  <div className="">
                     <ul>
                        <li>
                           <button>Cerca Auto</button>
                        </li>
                        <li>
                           <button>Inserisci Auto</button>
                        </li>
                        <li>
                           <button>Inserisci Auto</button>
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
                  <p>ricerca</p>
                  <p>vendi</p>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default MyNavbar;
