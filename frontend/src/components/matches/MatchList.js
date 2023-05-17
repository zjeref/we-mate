import React, {useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

const MatchList = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [prefer, setPrefer] = useState(null)
    const [index, setIndex] = useState(0);


    useEffect(() => {
        if (id === "undefined") {
            navigate('/')
        }
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.get(`${process.env.REACT_APP_API_URL}/user/matches`, { headers })
            .then(res => setPrefer(res.data))
            .catch(err => console.error(err))
    }, [id])

    const handleRematch = async() => {
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.put(`${process.env.REACT_APP_API_URL}/user/leftswipe`, {targetUser:prefer[index].user._id}, { headers })
            .then(res => console.log("Rematched"))
            .catch(err => console.error(err))
        setIndex(index+1)
    }

    const handleConnect = async () => {
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }

        await axios.put(`${process.env.REACT_APP_API_URL}/user/rightswipe`, {targetUserId:prefer[index].user._id}, { headers })
            .then(res => console.log("Connection sent"))
            .catch(err => console.error(err))
        setIndex(index+1)
    }

    return (
        <div className="w-full h-[800px] max-w-6xl flex flex-col items-center p-2 ">
            {prefer ?
                <div className=" bg-slate-400 w-full h-full flex justify-center  relative">
                    <div className='w-full absolute top-4 flex justify-between px-10 z-20'>
                        <div>
                            <button className='match-btn bg-white text-blackk'>{prefer[index].score}% Match</button>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <button className='match-btn bg-primary text-white' onClick={handleRematch}>REMATCH</button>
                            <button className='match-btn bg-white text-blackk' onClick={handleConnect}>CONNECT</button>
                        </div>
                    </div>
                    <img src={prefer[index].user.preference.photoes[0]} alt="" className='max-w-3xl h-auto object-cover filter brightness-100' />
                    <div className="absolute inset-0 bg-gradient-stop-30"></div>

                    <div className='w-full absolute bottom-20 flex flex-col text-white space-y-9 px-10 ' >
                        <div className=''>
                            <h1 className='match-text'>{prefer[index].user.name}</h1>
                            <p className='drop-shadow-md'>{prefer[index].user.age}years</p>
                        </div>
                        <div>
                            <h1 className='match-text '>About</h1>
                            <p className='max-w-xl'>{prefer[index].user.preference.bio}</p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Course</h3>
                                <p>{prefer[index].user.preference.course}</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Movies</h3>
                                <p>{prefer[index].user.preference.movies}</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Music</h3>
                                <p>{prefer[index].user.preference.music}</p>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Hobbies</h3>
                                <p>{prefer[index].user.preference.hobbies}</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Personality</h3>
                                <p>{prefer[index].user.preference.personality}</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='match-text'>Sociality</h3>
                                <p>{prefer[index].user.preference.sociality}</p>
                            </div>
                        </div>
                    </div> 
                </div>: ""}
        </div>
    )
}

export default MatchList
