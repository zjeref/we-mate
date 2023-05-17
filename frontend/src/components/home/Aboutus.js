import React from 'react'
import aboutimg from '../../assets/aboutus.png'

const Aboutus = () => {
    return (
        <div className="max-w-6xl my-8 flex">
            <div className="w-1/2 bg-primary flex items-center justify-center mr-10">
                <img src={aboutimg} alt="" />
            </div>
            <div className="w-1/2 space-y-10 ml-10 flex flex-col justify-center">
                <h1 className="text-4xl font-bold">About us</h1>
                <p>Weemate was created by four college students who wanted to make it easier for other students to find like-minded friends on campus. Our team is passionate about helping students build meaningful connections and reach their full potential. We use advanced algorithms to match you with other students who share your interests, goals, and values. Join us today and discover your perfect match on campus!</p>
                <button className="btn bg-primary w-min">Signup</button>
            </div>
        </div>
    )
}

export default Aboutus
