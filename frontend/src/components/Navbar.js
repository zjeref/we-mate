import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Cookies from 'js-cookie';
import { GlobalState } from '../middlewares/global-states';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userData }) => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null);
    const { dispatch } = useContext(GlobalState)

    useEffect(() => {
        setCurrentUser(userData);
    }, [userData])

    const openProfile = () => {
        navigate(`/${currentUser._id}`)
    }

    return (
        <div className="w-full flex flex-col items-center px-4">
            <div className='max-w-6xl w-full p-2 flex justify-between my-2'>
                <img src={logo} alt="logo" />
                <div className='flex space-x-10 text-blackk font-sans text-lg '>
                    <p className='navbarMenu' onClick={() => Cookies.remove('authToken')}>HOME</p>
                    <p className='navbarMenu' >FIND MATCHES</p>
                    <p className='navbarMenu' >ABOUT US</p>
                    <p className='navbarMenu' >CONTACT</p>
                    {currentUser && currentUser.name ?
                        <p className='navbarMenu' onClick={openProfile}>{currentUser.name?.toUpperCase()}</p>
                        : <p className='navbarMenu'>PROFILE</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
