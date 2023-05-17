import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Cookies from 'js-cookie';
import { GlobalState } from '../middlewares/global-states';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = ({ userData }) => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { dispatch } = useContext(GlobalState)

    useEffect(() => {
        setCurrentUser(userData);
    }, [userData])

    const openProfile = () => {
        navigate(`/${currentUser._id}`)
    }


    const openMatch = () => {
        navigate(`/match/${currentUser._id}`)
    }

    const openChat = () => {
        navigate('/chats')
    }

    const toggleModal = () => {
        console.log(":dsada")
        setIsModalOpen(!isModalOpen)
    }

    const Logout = () => {
        Cookies.remove("authToken")
        navigate('/verify')
    }

    return (
        <div className="w-full flex flex-col items-center px-4">
            <div className='max-w-6xl w-full p-2 flex justify-between my-2'>
                <img src={logo} alt="logo" onClick={() => openMatch()} className='cursor-pointer' />
                <div className='flex space-x-10 text-blackk font-sans text-lg '>
                    <p className='navbarMenu' onClick={() => openMatch()}>HOME</p>
                    <p className='navbarMenu' onClick={() => openMatch()}>FIND MATCHES</p>
                    <p className='navbarMenu' >ABOUT US</p>
                    {currentUser && currentUser.name ?
                        <>
                            <p className='navbarMenu' onClick={openChat}>CHAT</p>
                            <div onClick={() => toggleModal()} className='relative z-50'>
                                <p className='navbarMenu' >{currentUser.name?.toUpperCase()}</p>
                                {isModalOpen ?
                                    <div className="absolute bg-white">
                                        <p className='navbarMenu' onClick={()=> openProfile()}>Profile</p>
                                        <p className='navbarMenu' onClick={()=> Logout()}>Logout</p>
                                    </div>
                                    : ""
                                }
                            </div>
                        </>
                        :
                        <>
                            <p className='navbarMenu'>CONTACT</p>
                            <p className='navbarMenu'>PROFILE</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
