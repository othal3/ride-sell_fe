import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuth } from "../middlewares/ProtectedRoutes";

const useSession = () => {
   const session = isAuth();
   const decodedSession = session ? jwtDecode(session) : null;

   const navigate = useNavigate();

   const checkTokenExpirationTime = () => {
      if (decodedSession && decodedSession.exp) {
         const convertUnixDateToMillisecond = decodedSession.exp * 1000;
         const expirationDate = new Date(convertUnixDateToMillisecond);
         const currentDate = new Date();

         if (expirationDate < currentDate) {
            localStorage.removeItem("loggedInUser");
         }
      }
   };

   useEffect(() => {
      if (session && window.location.pathname === "/login") {
         navigate("/", { replace: true });
      }
   }, [navigate, session]);

   useEffect(() => {
      checkTokenExpirationTime();
   });
   return decodedSession;
};

export default useSession;
