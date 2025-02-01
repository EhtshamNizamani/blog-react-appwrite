import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlicer'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }
    return (
        <button
            className="rounded-full px-4 py-1  hover:bg-blue-100 p-1            "
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn