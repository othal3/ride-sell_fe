import React from "react";
import MyNavbar from "../components/navbar/MyNavbar";

function MainLayout({ children }) {
   return (
      <>
         <MyNavbar />
         {children}
      </>
   );
}

export default MainLayout;
