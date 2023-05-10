import React from 'react'

const Strength = ({ photosData }) => {


    return (
        <div className="w-full max-w-6xl flex flex-col p-2 my-10">
            <div className="flex w-full justify-between">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-blackk">Profile Strength</h1>
                    <p className="text-2xl text-primary">65% complete</p>

                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center align-center">
                    <img src={photosData[0]} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Strength
