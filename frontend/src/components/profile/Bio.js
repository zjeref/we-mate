import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const Bio = ({ bioData }) => {
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setBio(bioData)
    }, [bioData])

    async function handleSubmit() {
        setIsLoading(true)
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        const formData = new FormData();
        formData.append('bio', bio);
        console.log(formData);
        await axios.put(`${process.env.REACT_APP_API_URL}/prefer/bio`, {bio}, {headers })
            .then(res => setBio(res.data))
            .catch(err => console.error(err))
        setIsLoading(false)
    }

    return (
        <div className="w-full max-w-6xl flex flex-col p-2">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">Bio</h1>
                    <button onClick={handleSubmit} className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Save" : "Saving..."}</button>
                </div>
                <p>Write a fun and punchy intro</p>
                <textarea name="bio" id="bio" rows="2" value={bio} className="border-[1px] border-blackk rounded-lg p-2 w-full" onChange={(e) => setBio(e.target.value)} />
            </div>
        </div>
    )
}

export default Bio
