import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from "../services/AuthService";

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className='navbar'>
            <div className='nav-container'>
                <NavLink to='/' className='navbar-brand'>
                    ✨ TaskFlow
                </NavLink>

                <ul className='nav-links'>
                    {isAuth && (
                        <li>
                            <NavLink to="/todos" className="nav-link">
                                📋 Todos
                            </NavLink>
                        </li>
                    )}

                    {!isAuth && (
                        <>
                            <li>
                                <NavLink to="/register" className="nav-link">
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}

                    {isAuth && (
                        <li>
                            <button
                                className="nav-link"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default HeaderComponent