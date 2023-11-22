import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useSearchParams } from "react-router-dom";
import useSession from "../hooks/useSession";

function PostPage() {
   const session = useSession();
   const [queryParameters] = useSearchParams();
   const id = queryParameters.get("id");
   const [post, setPost] = useState({});

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

   return (
      <MainLayout>
         <div className=" w-full flex justify-center">
            <div className="w-fit p-8 bg-white my-10 rounded-lg shadow-lg">
               <div className="flex">
                  <div className="">
                     <img
                        className=""
                        src={
                           post.img && post.img.length === 0
                              ? "https://img.icons8.com/ios/500/car--v1.png"
                              : "https://img.icons8.com/ios/50/car--v1.png"
                        }
                     />
                  </div>
                  <div>
                     <p>{post.make}</p>
                     <p>{post.model}</p>
                     <p>{post.price}</p>
                     <button>Aggingi Immagini</button>
                  </div>
               </div>
               <div className="grid grid-cols-3">
                  <p>{post.year}</p>
                  <p>{post.engine}</p>
                  <p>{post.fuelType}</p>
                  <p>{post.km}</p>
                  <p>{post.power}</p>
               </div>
            </div>
         </div>
      </MainLayout>
   );
}

export default PostPage;
