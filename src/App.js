import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import User from "./pages/User";
import UserData from "./pages/UserData";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/userData" element={<UserData />} />

            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
