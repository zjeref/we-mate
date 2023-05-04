import React, { useContext } from 'react'
import hero from '../../assets/hero.svg'
import { GlobalState } from '../../middlewares/global-states'

const Hero = () => {
    const { dispatch } = useContext(GlobalState)

    //opens sign up modal
    const openSignupModal = () => {
        dispatch({ type: "FIRE_MODAL", payload: "SIGNUP" })
    }

    const openLoginModal = () => {
        dispatch({ type: "FIRE_MODAL", payload: "LOGIN" })
    }

    return (
        <div className="w-full max-w-6xl flex justify-between items-center p-2 my-20">
            <div className="w-[60%]">
                <h1 className="text-4xl font-bold text-blackk">Find your perfect match on campus</h1>
                <p className="my-8 text-2xl">Connect with like-minded college students who share your interests, goals, and values</p>
                <div className="space-x-4">
                    <button className="btn bg-secondary" onClick={openSignupModal}>Sign Up</button>
                    <button className="btn bg-primary" onClick={openLoginModal}>Log In</button>
                </div>
            </div>
            <div>
                <img src={hero} alt="hero" className='w-96 h-64' />
            </div>
        </div>
    )
}

export default Hero
