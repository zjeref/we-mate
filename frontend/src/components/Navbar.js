import React from 'react'
import logo from '../assets/logo.svg'

const Navbar = () => {
    return (
        <div className='max-w-6xl w-full p-2 flex justify-between my-2'>
            <img src={logo} alt="logo" />
            <div className='flex space-x-3 text-blackk font-sans text-lg'>
                <p className=''>HOME</p>
                <p>FIND MATCHES</p>
                <p>ABOUT US</p>
                <p>CONTACT</p>
                <p>PROFILE</p>
            </div>
        </div>
    )
}

export default Navbar
