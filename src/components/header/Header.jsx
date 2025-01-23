import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/authSlicer';
import { Container, Logo } from '../index'
const Header = () => {

    const authStatus = useSelector((state) => state.auth?.status ?? false);

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
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
    ]
    return <header>
        <Container>
            <div className="flex justify-between items-center bg-slate-400">
                {/* Logo on the left */}
                <div className="logo">
                    <Logo />
                </div>

                {/* Navigation items */}
                <ul className="flex gap-3 items-center pr-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink to={item.slug} className={({ isActive }) => isActive ? "text-red-600 font-bold hover:text-red-500" : "text-gray-700 hover:text-red-500"} >{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>


        </Container>
    </header>
};

export default Header;
