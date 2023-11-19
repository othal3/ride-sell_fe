import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForm() {
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
            `${process.env.REACT_APP_SERVER_BASE_URL}/user/create`,
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
            <label>name</label>
            <div>
               <input name="firstName" onChange={handleInputChange} />
            </div>
         </div>
         <div className="formInput">
            <label>lastname</label>
            <div>
               <input name="lastName" onChange={handleInputChange} />
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
            <label>dateOfBirth</label>
            <div>
               <input
                  name="dateOfBirth"
                  type="date"
                  onChange={handleInputChange}
               />
            </div>
         </div>
         <div className="formInput">
            <label>phoneNumber</label>
            <div>
               <input name="phoneNumber" onChange={handleInputChange} />
            </div>
         </div>
         <div className="formInput">
            <label>Sesso</label>
            <div>
               <select name="gender" onChange={handleInputChange}>
                  <option>Uomo</option>
                  <option>Donna</option>
                  <option>Non-Binary</option>
               </select>
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

export default UserForm;
