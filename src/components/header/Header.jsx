import React, { useState } from "react";
import { useSelector, } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
const Header = () => {
    const authStatus = useSelector((state) => state.auth?.status);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];
    return (
        <header>
            <Container>
                <div className="flex justify-between items-center bg-slate-400">
                    {/* Logo on the left */}
                    <div className="logo pl-8 pr-4 py-1">
                        <Logo />
                    </div>
                    <div className="sm:hidden flex justify-center items-center pl-8">
                        <i
                            className="bx bx-menu text-2xl px-4 py-1 cursor-pointer "
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        ></i>
                    </div>
                    {/* Navigation items */}
                    <ul className="hidden sm:flex gap-3 items-center pr-4 py-1  ">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) => (isActive ? " bg-blue-100 rounded-full px-4 py-1" : "rounded-full px-4 py-1  hover:bg-blue-100 p-1 ")}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li >
                                <LogoutBtn />
                            </li>
                        )}


                    </ul>
                </div>



                <ul className={` sm:hidden flex flex-col items-center justify-center transition-all duration-300 bg-white " ${isMenuOpen ? "opacity-100" : "hidden opacity-0"}`}>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name} className="w-full flex py-1 ">
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) => (isActive ? " bg-blue-100 rounded-sm px-4 py-1 w-full text-center" : "rounded-sm px-4 py-1 text-center hover:bg-blue-100 p-1 w-full text-center ")}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li >
                            <LogoutBtn />
                        </li>
                    )}


                </ul>


            </Container>
        </header>
    );
};

export default Header;
