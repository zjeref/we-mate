import React, { useContext, useEffect, useState } from 'react'
import Features from '../components/home/Features'
import Signup from '../components/home/Signup'
import { GlobalState } from '../middlewares/global-states'
import { Outlet } from 'react-router-dom'
import Login from '../components/home/Login'

const Home = () => {
    const { data } = useContext(GlobalState)
    const [states, setStates] = useState(null)
    useEffect(() => {
        setStates(data)
    }, [data])

    return (
        <>
            {states && states.activeModal === "SIGNUP" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <Signup />
                    </div>
                </div>
            ) : null}
            {states && states.activeModal === "LOGIN" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <Login />
                    </div>
                </div>
            ) : null}
            <div className="w-full flex flex-col items-center">
                <div className="relative">
                    <Outlet />
                    <Features />
                </div>
            </div>
        </>
    );

}

export default Home
