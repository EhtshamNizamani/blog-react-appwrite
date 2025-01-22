import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
            <div className='flex '>
                <div>
                    <Logo width='80px' />

                </div>
                <ul className='flex gap-4 align-center border '>
                    {navItems.map((item) => {
                        return <li key={item.name}>
                            <Link to={item.slug}>{item.name}</Link>

                        </li>
                    })}
                </ul>

            </div>

        </Container>
    </header>
};

export default Header;
