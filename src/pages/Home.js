import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useSession from "../hooks/useSession";

function Home() {
   const [session, setSession] = useState(useSession());

   return (
      <MainLayout>
         <div className=" h-screen ">ciao</div>
      </MainLayout>
   );
}

export default Home;
