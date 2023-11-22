import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useSession from "../hooks/useSession";

function UserData() {
   const session = useSession();
   const [image, setImage] = useState(session.avatar);
   const [imagePreview, setImagePreview] = useState(session.avatar);
   const [formData, setFormData] = useState(null);

   const handleImageChange = (e) => {
      const file = e.target.files[0];

      setImage({
         avatar: file,
      });

      if (file) {
         const reader = new FileReader();

         reader.onload = function (e) {
            setImagePreview(e.target.result);
         };

         reader.readAsDataURL(file);
      }
   };

   const handleOpenModalImg = () => {
      const modal = document.getElementById("modalImg");
      modal.classList.remove("hidden");
      document.getElementById("root").classList.add("overflow-y-hidden");
   };

   const handleCloseModalImg = () => {
      const modal = document.getElementById("modalImg");
      modal.classList.add("hidden");
      document.getElementById("root").classList.remove("overflow-y-hidden");
   };

   const onSubmitImg = async (e) => {
      e.preventDefault();

      if (session.role === "user") {
         try {
            const formImgData = new FormData();
            formImgData.append("avatar", image.avatar);
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/user/cloudUpdate/${session.id}`,
               {
                  method: "PATCH",
                  body: formImgData,
               }
            );
            if (response.ok) {
               const data = await response.json();

               const newToken = JSON.stringify(data.token);

               localStorage.setItem("loggedInUser", newToken);

               window.location.reload();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            const formImgData = new FormData();
            formImgData.append("avatar", image.avatar);
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/company/cloudUpdate/${session.id}`,
               {
                  method: "PATCH",
                  body: formImgData,
               }
            );
            if (response.ok) {
               const data = await response.json();

               const newToken = JSON.stringify(data.token);

               localStorage.setItem("loggedInUser", newToken);

               window.location.reload();
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const onSubmitData = async (e) => {
      e.preventDefault();
      if (session.role === "user") {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/user/update/${session.id}`,
               {
                  headers: {
                     "Content-Type": "application/json",
                  },
                  method: "PATCH",
                  body: JSON.stringify(formData),
               }
            );
            if (response.ok) {
               const data = await response.json();

               const newToken = JSON.stringify(data.token);

               localStorage.setItem("loggedInUser", newToken);

               window.location.reload();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_SERVER_BASE_URL}/company/update/${session.id}`,
               {
                  headers: {
                     "Content-Type": "application/json",
                  },
                  method: "PATCH",
                  body: JSON.stringify(formData),
               }
            );
            if (response.ok) {
               const data = await response.json();

               const newToken = JSON.stringify(data.token);

               localStorage.setItem("loggedInUser", newToken);

               window.location.reload();
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   if (session.role === "user") {
      return (
         <MainLayout>
            <div className=" flex justify-center mt-[15vh]">
               <div className=" bg-white flex flex-col items-center shadow-lg p-20 ">
                  <h2 className=" font-bold text-4xl ">Dati Personali</h2>
                  <div className=" userData ">
                     <button
                        className=" rounded-full relative "
                        onClick={handleOpenModalImg}
                     >
                        <img
                           src={session.avatar}
                           className=" w-32 h-32 overflow-hidden rounded-full opacity-100 hover:opacity-[-0.5] object-cover "
                        />
                        <div className=" absolute w-full h-full bg-[rgba(0,0,0,0)] top-0 rounded-full  hover:bg-[rgba(0,0,0,0.3)] flex items-center">
                           <div className=" opacity-0 hover:opacity-100 w-full h-full flex items-center ">
                              <p className="  text-slate-50 ">
                                 Cambia Immagine
                              </p>
                           </div>
                        </div>
                     </button>
                     <div
                        id="modalImg"
                        className=" hidden absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex justify-center items-center "
                     >
                        <form
                           onSubmit={onSubmitImg}
                           className=" bg-white p-10 rounded-lg relative grid grid-cols-1 gap-3 justify-items-center"
                        >
                           <button
                              className=" absolute top-2 right-2 "
                              onClick={handleCloseModalImg}
                           >
                              <img
                                 src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
                                 alt="delete-sign"
                              />
                           </button>
                           <h3 className=" font-bold text-3xl mb-4 ">
                              Modifica immagine del profilo
                           </h3>
                           <img
                              id="imgPreview"
                              src={imagePreview}
                              className=" w-40 h-40 overflow-hidden rounded-full opacity-100 hover:opacity-[-0.5] object-cover "
                           />

                           <input
                              id="imageInput"
                              type="file"
                              accept="image/*"
                              name="avatar"
                              onChange={handleImageChange}
                              className=" hidden "
                           />
                           <label
                              htmlFor="imageInput"
                              className=" font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                           >
                              <img
                                 src="https://img.icons8.com/ios/30/f8fafc/upload--v1.png"
                                 alt="upload--v1"
                              />
                              Seleziona Immagine
                           </label>
                           <button
                              type="submit"
                              className=" font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                           >
                              Invia
                           </button>
                        </form>
                     </div>
                     <form onSubmit={onSubmitData}>
                        <div>
                           <label>Nome</label>
                           <input
                              type="text"
                              placeholder={session.firstName}
                              name="firstName"
                              onChange={handleInputChange}
                           />
                        </div>
                        <div>
                           <label>Cognome</label>
                           <input
                              type="text"
                              placeholder={session.lastName}
                              name="lastName"
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <div>
                           <label>Email</label>
                           <input
                              type="text"
                              placeholder={session.email}
                              name="email"
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <div>
                           <label>Data Di Nascita</label>
                           <input
                              type="text"
                              placeholder={session.dateOfBirth}
                              name="dateOfBirth"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <div>
                           <label>Numero di telefono</label>
                           <input
                              type="text"
                              placeholder={session.phoneNumber}
                              name="phoneNumber"
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <button
                           type="submit"
                           className=" mt-10 font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                        >
                           Invia
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </MainLayout>
      );
   } else {
      return (
         <MainLayout>
            <div className=" flex justify-center mt-[15vh]">
               <div className=" bg-white flex flex-col items-center shadow-lg p-20 ">
                  <h2 className=" font-bold text-4xl ">Dati Personali</h2>
                  <div className=" userData ">
                     <button
                        className=" rounded-full relative "
                        onClick={handleOpenModalImg}
                     >
                        <img
                           src={session.avatar}
                           className=" w-32 h-32 overflow-hidden rounded-full opacity-100 hover:opacity-[-0.5] object-cover "
                        />
                        <div className=" absolute w-full h-full bg-[rgba(0,0,0,0)] top-0 rounded-full  hover:bg-[rgba(0,0,0,0.3)] flex items-center">
                           <div className=" opacity-0 hover:opacity-100 w-full h-full flex items-center ">
                              <p className="  text-slate-50 ">
                                 Cambia Immagine
                              </p>
                           </div>
                        </div>
                     </button>
                     <div
                        id="modalImg"
                        className=" hidden absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex justify-center items-center "
                     >
                        <form
                           onSubmit={onSubmitImg}
                           className=" bg-white p-10 rounded-lg relative grid grid-cols-1 gap-3 justify-items-center"
                        >
                           <button
                              className=" absolute top-2 right-2 "
                              onClick={handleCloseModalImg}
                           >
                              <img
                                 src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
                                 alt="delete-sign"
                              />
                           </button>
                           <h3 className=" font-bold text-3xl mb-4 ">
                              Modifica immagine del profilo
                           </h3>
                           <img
                              id="imgPreview"
                              src={imagePreview}
                              className=" w-40 h-40 overflow-hidden rounded-full opacity-100 hover:opacity-[-0.5] object-cover "
                           />

                           <input
                              id="imageInput"
                              type="file"
                              accept="image/*"
                              name="avatar"
                              onChange={handleImageChange}
                              className=" hidden "
                           />
                           <label
                              htmlFor="imageIput"
                              className=" font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                           >
                              <img
                                 src="https://img.icons8.com/ios/30/f8fafc/upload--v1.png"
                                 alt="upload--v1"
                              />
                              Seleziona Immagine
                           </label>
                           <button
                              type="submit"
                              className=" font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                           >
                              Invia
                           </button>
                        </form>
                     </div>
                     <form onSubmit={onSubmitData}>
                        <div>
                           <label>Nome</label>
                           <input
                              type="text"
                              placeholder={session.name}
                              name="name"
                              onChange={handleInputChange}
                           />
                        </div>
                        <div>
                           <label>Email</label>
                           <input
                              type="text"
                              placeholder={session.email}
                              name="email"
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <div>
                           <label>Numero di telefono</label>
                           <input
                              type="text"
                              placeholder={session.phoneNumber}
                              name="phoneNumber"
                              onChange={handleInputChange}
                           ></input>
                        </div>
                        <button
                           type="submit"
                           className=" mt-10 font-bold text-xl bg-purple-400 text-slate-50 py-2.5 px-5 rounded-full flex items-center gap-3 cursor-pointer "
                        >
                           Invia
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </MainLayout>
      );
   }
}

export default UserData;
