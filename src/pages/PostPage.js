import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useSearchParams } from "react-router-dom";
import useSession from "../hooks/useSession";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function PostPage() {
   const session = useSession();
   const [queryParameters] = useSearchParams();
   const id = queryParameters.get("id");
   const [post, setPost] = useState({});
   const [image, setImage] = useState({});
   const [imagePreviews, setImagePreviews] = useState(null);

   const getPosts = async () => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`
         );
         const data = await response.json();
         setPost(data.post);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      getPosts();
   }, []);

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

   const handleImageChange = (e) => {
      const file = e.target.files[0];

      setImage({
         img: file,
      });

      if (file) {
         const reader = new FileReader();

         reader.onload = function (e) {
            setImagePreviews(e.target.result);
         };

         reader.readAsDataURL(file);
      }
   };

   const onSubmitImg = async (e) => {
      e.preventDefault();
      console.log(image);

      try {
         const formData = new FormData();
         formData.append("img", image.img);

         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/post/imgUpload/${id}`,
            {
               method: "PATCH",
               body: formData,
            }
         );
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <MainLayout>
         <div className=" w-full flex justify-center">
            <div className="w-fit p-8 bg-white my-10 rounded-lg shadow-lg">
               <div className="flex">
                  <div className="">
                     <img
                        className=""
                        src={
                           post && post.img && post.img.length === 0
                              ? "https://img.icons8.com/ios/500/car--v1.png"
                              : "https://img.icons8.com/ios/50/car--v1.png"
                        }
                     />
                  </div>
                  <div>
                     <p className=" font-bold text-3xl ">{post && post.make}</p>
                     <p className=" font-medium text-2xl ">
                        {post && post.model}
                     </p>
                     <p className=" font-bold text-3xl mt-6 ">
                        € {post && post.price}
                     </p>
                     {/* {post && post.author === session.id && (
                        <button onClick={handleOpenModalImg}>
                           Aggingi Immagini
                        </button>
                     )} */}
                  </div>
               </div>
               <div className="grid grid-cols-3">
                  <div>
                     <p className=" font-normal text-2xl ">Anno</p>
                     <p className=" font-bold text-2xl ">{post && post.year}</p>
                  </div>
                  <div>
                     <p className=" font-normal text-2xl ">Cilindrata</p>
                     <p className=" font-bold text-2xl ">
                        {post && post.engine}
                     </p>
                  </div>
                  <div>
                     <p className=" font-normal text-2xl ">Carburante</p>
                     <p className=" font-bold text-2xl ">
                        {post && post.fuelType}
                     </p>
                  </div>
                  <div>
                     <p className=" font-normal text-2xl ">Chilometri</p>
                     <p className=" font-bold text-2xl ">
                        {post && post.km} Km
                     </p>
                  </div>
                  <div>
                     <p className=" font-normal text-2xl ">Potenza</p>
                     <p className=" font-bold text-2xl ">
                        {post && post.power}
                     </p>
                  </div>
               </div>
               <div className=" w-full text-center mt-10 ">
                  <p className=" font-bold text-2xl ">Descrizione</p>
                  <p className=" font-normal text-1xl ">
                     {post && post.description}
                  </p>
               </div>
            </div>
         </div>
         <div
            id="modalImg"
            className=" hidden absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex justify-center items-center "
         >
            <form
               onSubmit={onSubmitImg}
               className=" bg-white p-10 rounded-lg relative grid grid-cols-1 gap-3 justify-items-center"
            >
               <button
                  type="button"
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
               {imagePreviews && <img className=" w-56 " src={imagePreviews} />}

               <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  name="img"
                  className=" hidden "
                  onChange={handleImageChange}
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
      </MainLayout>
   );
}

export default PostPage;
