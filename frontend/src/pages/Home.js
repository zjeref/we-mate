import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Signup from '../components/home/Signup'
import { GlobalState } from '../middlewares/global-states'

const Home = () => {
    const { data, dispatch } = useContext(GlobalState)
    const [states, setStates] = useState(null)
    useEffect(() => {
        setStates(data)
    })

    return (
        <div className="w-full flex flex-col items-center ">
            <Navbar />
            {states && states.activeModal === "SIGNUP" ?
                <Signup /> : ""
            }
            <Hero />
            <Features />
        </div>
    )
}

export default Home
