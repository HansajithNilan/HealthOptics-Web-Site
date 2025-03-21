import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Register" element={<UserRegisterPage />} />
   

      </Routes>
    </BrowserRouter>
  );
}



export default App;
