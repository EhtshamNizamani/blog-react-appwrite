import React, { useState, useEffect } from "react";
import { login, logout } from "../../store/authSlicer";
import { dispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { Header, Footer } from "../index";
import { Outlet } from "react-router-dom";
const Header = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {

                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);
    return !loading ? (<div>
        <Header />
        <main>
            {/* <Outlet/> */}

        </main>
        <Footer />
    </div>) : (<div>Loading ......</div>)
};

export default Header;
