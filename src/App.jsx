import React, { useState, useEffect } from "react";

import './App.css'
import { login, logout } from "../src/store/authSlicer";
import { useDispatch } from 'react-redux'
import authService from "../src/appwrite/auth";
import { Header, Footer } from "../src/components/index";
import { Outlet } from "react-router-dom";
function App() {


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("Logged in user:", userData);
          useDispatch(login({ userData }));
        } else {
          console.log("No user logged in. Guest session detected.");
          useDispatch(logout());
        }
      })
      .catch((error) => console.error("Error fetching user:", error))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (<div>
    <Header />
    <main>
      {/* <Outlet/> */}

    </main>
    <Footer />
  </div>) : (<div>Loading ......</div>)
}

export default App
