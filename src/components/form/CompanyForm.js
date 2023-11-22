import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompanyForm() {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [formData, setFormData] = useState(null);
   const navigate = useNavigate();

   const loginClick = (e) => {
      navigate("/login");
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };
   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/company/create`,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify(formData),
            }
         );

         if (response.ok) {
            loginClick();
         }
      } catch (error) {
         console.error("Errore durante la richiesta:", error);
      }
   };

   const visibleClick = (e) => {
      e.preventDefault();
      setIsPasswordVisible(!isPasswordVisible);
   };

   return (
      <form
         className=" grid grid-cols-1 gap-3 border-b-2 border-slate-200 pb-5"
         onSubmit={onSubmit}
      >
         <div className="formInput">
            <label>Nome</label>
            <div>
               <input name="name" onChange={handleInputChange} />
            </div>
         </div>
         <div className="formInput">
            <label>email</label>
            <div>
               <input name="email" onChange={handleInputChange} />
            </div>
         </div>
         <div className="formInput">
            <label>password</label>
            <div>
               <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
               />
               <button
                  onClick={visibleClick}
                  className=" absolute right-2 top-1 "
               >
                  <img
                     width="30"
                     height="30"
                     src={
                        isPasswordVisible
                           ? "https://img.icons8.com/ios/50/visible--v1.png"
                           : "https://img.icons8.com/ios/50/hide.png"
                     }
                     alt="hide"
                  />
               </button>
            </div>
         </div>
         <div className="formInput">
            <label>phoneNumber</label>
            <div>
               <input name="phoneNumber" onChange={handleInputChange} />
            </div>
         </div>

         <button
            type="submit"
            className=" bg-purple-400 rounded-xl hover:bg-purple-500 text-slate-50 py-3 font-bold"
         >
            Registrati
         </button>
      </form>
   );
}

export default CompanyForm;
