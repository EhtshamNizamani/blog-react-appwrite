import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
const Header = () => {
    const authStatus = useSelector((state) => state.auth?.status);
    const navigate = useNavigate();
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
                    <div className="logo pl-8">
                        <Logo />
                    </div>

                    {/* Navigation items */}
                    <ul className="flex gap-3 items-center pr-4 py-2">
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
            </Container>
        </header>
    );
};

export default Header;
