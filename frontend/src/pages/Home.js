import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/home/Features'
import Signup from '../components/home/Signup'
import { GlobalState } from '../middlewares/global-states'
import { Outlet } from 'react-router-dom'
import Login from '../components/home/Login'

const Home = () => {
    const { data, dispatch } = useContext(GlobalState)
    const [states, setStates] = useState(null)
    useEffect(() => {
        setStates(data)
    }, [data])

    return (
        <div className="w-full flex flex-col items-center px-4">
            <Navbar userData={data.loggedUser} />
            {states && states.activeModal === "SIGNUP" ?
                <Signup /> : ""
            }
            {states &&
                states.activeModal === "LOGIN" ?
                <Login /> : ""
            }
            <Outlet />
            <Features />
        </div>
    )
}

export default Home
