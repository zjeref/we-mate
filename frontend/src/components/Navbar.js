import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Cookies from 'js-cookie';

const Navbar = ({ userData }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        setCurrentUser(userData);
    }, [userData])

    
    return (
        <div className='max-w-6xl w-full p-2 flex justify-between my-2'>
            <img src={logo} alt="logo" />
            <div className='flex space-x-3 text-blackk font-sans text-lg'>
                <p className='' onClick={() => Cookies.remove('authToken')}>HOME</p>
                <p>FIND MATCHES</p>
                <p>ABOUT US</p>
                <p>CONTACT</p>
                {currentUser ?
                    <p>{currentUser.name}</p>
                    : <p>PROFILE</p>
                }
            </div>
        </div>
    )
}

export default Navbar
