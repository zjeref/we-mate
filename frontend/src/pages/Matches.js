
import React from 'react'
import Features from '../components/home/Features';
import MatchList from '../components/matches/MatchList';
import Testimonials from '../components/home/Testimonials';
import Aboutus from '../components/home/Aboutus';
import Footer from '../components/home/Footer';

const Matches = () => {

    return (
        <div className="w-full flex flex-col items-center px-4">
            <MatchList />
            <Features />
            <Testimonials />
            <Aboutus />
            <Footer/>
        </div>
    )
}

export default Matches
