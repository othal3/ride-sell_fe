import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserForm from "../components/form/UserForm";
import CompanyForm from "../components/form/CompanyForm";
import { useNavigate } from "react-router-dom";

function Register() {
   const [slectedButton, setSelectedButton] = useState("userButton");
   const [formData, setFormData] = useState(null);
   const navigate = useNavigate();

   const loginClick = (e) => {
      navigate("/login");
   };

   const handleButtonSelected = (e) => {
      setSelectedButton(e.currentTarget.id);
   };

   return (
      <>
         <MainLayout>
            <div className=" w-screen mt-4 md:mt-40 flex justify-center">
               <div className=" shadow-lg self-center bg-white p-4 pt-0 rounded-lg grid grid-cols-1">
                  <div className="registerSelector">
                     <button
                        id="userButton"
                        onClick={handleButtonSelected}
                        className={
                           slectedButton === "userButton"
                              ? "opacity-100"
                              : "opacity-60"
                        }
                     >
                        <img
                           src="https://img.icons8.com/ios/50/user--v1.png"
                           alt="user--v1"
                        />
                        <h3>UTENTE</h3>
                     </button>
                     <button
                        id="companyButton"
                        onClick={handleButtonSelected}
                        className={
                           slectedButton === "companyButton"
                              ? "opacity-100"
                              : "opacity-60"
                        }
                     >
                        <img
                           src="https://img.icons8.com/ios/50/briefcase.png"
                           alt="briefcase"
                        />
                        <h3>RIVENDITORE</h3>
                     </button>
                  </div>
                  <div className=" mx-8 ">
                     <h2 className=" text-4xl font-bold pb-2 ">REGISTRATI</h2>

                     {slectedButton === "userButton" ? (
                        <UserForm />
                     ) : (
                        <CompanyForm />
                     )}
                     <button
                        className="bg-purple-400 rounded-xl hover:bg-purple-500 text-slate-50 py-3 font-bold mt-5 w-full"
                        onClick={loginClick}
                     >
                        Accedi
                     </button>
                  </div>
               </div>
            </div>
         </MainLayout>
      </>
   );
}

export default Register;
