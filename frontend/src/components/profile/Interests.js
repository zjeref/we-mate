import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const Interests = ({ interestData }) => {
    const [enums, setEnums] = useState(null);
    const [hobbies, setHobbies] = useState("");
    const [movies, setMovies] = useState("");
    const [music, setMusic] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/prefer/enums`)
            .then(res => setEnums(res.data))
            .catch(err => console.error(err))

    }, [])

    useEffect(() => {
        if (interestData) {
            setHobbies(interestData.hobbies)
            setMovies(interestData.movies)
            setMusic(interestData.music)
        }
        // console.log(course, personality, sociality, "sd")
    }, [interestData])


    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        await axios.put(`${process.env.REACT_APP_API_URL}/prefer/interests`, { movies, music, hobbies }, { headers })
            .then(res => {
                setMovies(res.data.movies)
                setMusic(res.data.music)
                setHobbies(res.data.hobbies)
                console.log("success")
            })
            .catch(err => console.error(err))
        setIsLoading(false);
    }


    return (
        <div className="w-full max-w-6xl flex flex-col p-2 my-5">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">Interests</h1>
                    <button onClick={submitForm} className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Save" : "Saving..."}</button>
                </div>
                <div className='w-full bg-white'>
                    <form className='flex justify-around p-2 border-[1px] border-blackk rounded-lg'>
                        <label htmlFor="hobies" className="flex flex-col w-1/3">
                            <select name="hobbies" id="hobbies" className="input-form" value={hobbies} onChange={(e) => setHobbies(e.target.value)}>
                                <option value="None">Your hobbies Here</option>
                                {enums && enums.hobbies.map((ehobbies) => {
                                    return <option key={ehobbies} value={ehobbies}>{ehobbies}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Music" className="flex flex-col w-1/3">
                            <select name="Music" id="Music" className="input-form" value={music} onChange={(e) => setMusic(e.target.value)}>
                                <option value="None">Your Music Here</option>
                                {enums && enums.music.map((eMusic) => {
                                    return <option key={eMusic} value={eMusic} className=''>{eMusic}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Movies" className="flex flex-col  w-1/3">
                            <select name="Movies" id="Movies" className="input-form" value={movies} onChange={(e) => setMovies(e.target.value)}>
                                <option value="None">Your Sociality Here</option>
                                {enums && enums.movies.map((eMovies) => {
                                    return <option key={eMovies} value={eMovies}>{eMovies}</option>
                                })}
                            </select>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Interests
