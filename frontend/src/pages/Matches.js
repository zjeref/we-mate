
import React from 'react'
import Features from '../components/home/Features';
import MatchList from '../components/matches/MatchList';

const Matches = () => {

    return (
        <div className="w-full flex flex-col items-center px-4">
            <MatchList/>
            <Features/>
        </div>
    )
}

export default Matches
