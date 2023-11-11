import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Register() {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      dateOfBirth: "",
      phoneNumber: "",
      gender: "Uomo", // Valore predefinito
   });

   const visibleClick = (e) => {
      e.preventDefault();
      setIsPasswordVisible(!isPasswordVisible);
   };

   const loginClick = (e) => {
      navigate("/login");
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      console.log(`${process.env.REACT_APP_SERVER_BASE_URL}/user/create`);

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

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   return (
      <>
         <MainLayout>
            <div className=" w-screen mt-4 md:mt-40 flex justify-center">
               <div className=" h-[fit] shadow-lg self-center bg-white p-8 rounded-lg grid grid-cols-1 ">
                  <form
                     className=" grid grid-cols-1 gap-3 border-b-2 border-slate-200 pb-5"
                     onSubmit={onSubmit}
                  >
                     <h2 className=" text-4xl font-bold pb-2 ">REGISTRATI</h2>
                     <div className="formInput">
                        <label>firstname</label>
                        <div>
                           <input
                              name="firstname"
                              onChange={handleInputChange}
                           />
                        </div>
                     </div>
                     <div className="formInput">
                        <label>lastname</label>
                        <div>
                           <input
                              name="lastname"
                              onChange={handleInputChange}
                           />
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
                           <input
                              name="phoneNumber"
                              onChange={handleInputChange}
                           />
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
                  <button
                     className="bg-purple-400 rounded-xl hover:bg-purple-500 text-slate-50 py-3 font-bold mt-5"
                     onClick={loginClick}
                  >
                     Accedi
                  </button>
               </div>
            </div>
         </MainLayout>
      </>
   );
}

export default Register;
