import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useSession from "../hooks/useSession";
import CardContainer from "../components/posts/CardContainer";

function Home() {
   const [session, setSession] = useState(useSession());

   return (
      <MainLayout>
         <div className=" h-screen ">
            <CardContainer />
         </div>
      </MainLayout>
   );
}

export default Home;
