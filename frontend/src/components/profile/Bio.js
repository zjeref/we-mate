import React from 'react'

const Bio = () => {


    return (
        <div className="w-full max-w-6xl flex flex-col p-2">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">Bio</h1>
                    <button className='btn bg-secondary'>Save</button>
                </div>
                <p>Write a fun and punchy intro</p>
                <textarea name="bio" id="bio" rows="2" className="border-[1px] border-blackk rounded-lg p-2 w-full"></textarea>
            </div>
        </div>
    )
}

export default Bio
