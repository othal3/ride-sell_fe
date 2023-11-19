import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

function User() {
   const session = useSession();

   return (
      <MainLayout>
         <div className=" flex justify-center mt-[15vh]">
            <div className=" bg-white flex flex-col items-center shadow-lg p-20 ">
               <h2 className=" font-bold text-4xl ">Area Personale</h2>
               <div className=" userOption ">
                  <a href="/userFavourite">
                     <button>
                        <img
                           src="https://img.icons8.com/ios/96/favorites.png"
                           alt="favorites"
                        />
                        <p>Post Preferiti</p>
                     </button>
                  </a>
                  <a href="/userData">
                     <button>
                        <img
                           src="https://img.icons8.com/ios/96/contact-card.png"
                           alt="contact-card"
                        />
                        <p>Dati Utente</p>
                     </button>
                  </a>
                  <a href="/userPost">
                     <button>
                        <img
                           src="https://img.icons8.com/ios/96/garage.png"
                           alt="garage"
                        />
                        <p>I Tuoi Post</p>
                     </button>
                  </a>
               </div>
            </div>
         </div>
      </MainLayout>
   );
}

export default User;
