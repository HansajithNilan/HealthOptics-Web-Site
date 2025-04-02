import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [id, setId] = useState([]); // null instead of empty string for clarity
  const [name,setName] = useState('');
  const [email,setEmail] = useState('')

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
  

    const parsedToken = JSON.parse(token);
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user/getcurrentuser", {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
      setId(res.data.id);
      setName(res.data.name);
      setEmail(res.data.email);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data");
 
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    await fetchUser(); // ensure state is updated after login
  };

  const logout = () => {
    setId(null);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ id, login, logout,name,email}}>
      {children}
    </AuthContext.Provider>
  );
};
