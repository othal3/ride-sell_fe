import React from "react";
import MainLayout from "../layouts/MainLayout";
import NotFoundImg from "../data/NotFound.png";

function NotFound() {
   return (
      <div>
         <MainLayout>
            <div className="flex flex-col justify-center items-center h-[70vh]">
               <img src={NotFoundImg} alt="NotFoundImg" />
               <h2 className=" text-center font-mono text-slate-600 text-5xl">
                  404 <br />
                  <span className="text-4xl">Page Not Found</span>
               </h2>
               <a
                  className=" rounded-full bg-purple-400 py-2.5 px-5 mt-4 "
                  href="/"
               >
                  Back to the home
               </a>
            </div>
         </MainLayout>
      </div>
   );
}

export default NotFound;
