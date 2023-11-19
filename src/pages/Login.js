import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [loginData, setLoginData] = useState({});
   const [login, setLogin] = useState(null);

   const registerClick = (e) => {
      navigate("/register");
   };

   const visibleClick = (e) => {
      e.preventDefault();
      setIsPasswordVisible(!isPasswordVisible);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setLoginData({
         ...loginData,
         [name]: value,
      });
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify(loginData),
            }
         );
         const data = await response.json();

         if (data.token) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.token));
            navigate("/");
         }

         setLogin(data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <MainLayout>
         <div className=" w-screen mt-4 md:mt-60 flex justify-center ">
            <div className=" h-[fit] shadow-lg self-center bg-white p-8 rounded-lg grid grid-cols-1">
               <form
                  className=" grid grid-cols-1 gap-3 border-b-2 border-slate-200 pb-5"
                  onSubmit={onSubmit}
               >
                  <h2 className=" text-4xl font-bold pb-2 ">LOGIN</h2>
                  <div className="formInput">
                     <label>E-mail</label>
                     <div>
                        <input
                           type="text"
                           name="email"
                           onChange={handleInputChange}
                        />
                     </div>
                  </div>
                  <div className="formInput">
                     <label>Password</label>
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
                  <button
                     type="submit"
                     className=" bg-purple-400 rounded-xl hover:bg-purple-500 text-slate-50 py-3 font-bold"
                  >
                     Accedi
                  </button>
               </form>
               <button
                  className="bg-purple-400 rounded-xl hover:bg-purple-500 text-slate-50 py-3 font-bold mt-5"
                  onClick={registerClick}
               >
                  Registrati
               </button>
            </div>
         </div>
      </MainLayout>
   );
}

export default Login;
