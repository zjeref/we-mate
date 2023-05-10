import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalState } from '../middlewares/global-states';
import Cookies from 'js-cookie';
import Features from '../components/home/Features';

const Matches = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const { data, dispatch } = useContext(GlobalState)
    const [currentUser, setCurrentUser] = useState(null)
    const [prefer, setPrefer] = useState(null)

    useEffect(() => {
        if (id === "undefined") {
            navigate('/')
        }
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.get(`${process.env.REACT_APP_API_URL}/prefer/`, { headers })
            .then(res => setPrefer(res.data))
            .catch(err => console.error(err))

    }, [id])

    useEffect(() => {
        setCurrentUser(data.loggedUser)
    }, [data.loggedUser])

    return (
        <div className="w-full flex flex-col items-center px-4">
            <div className="w-full h-[800px] max-w-6xl flex flex-col items-center p-2 ">
                <div className=" bg-slate-400 w-full h-full flex justify-center  relative">
                    <div className='w-full absolute top-4 flex justify-between px-10 z-20'>
                        <div>
                            <button className='match-btn bg-white text-blackk'>98% Match</button>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <button className='match-btn bg-primary text-white'>REMATCH</button>
                            <button className='match-btn bg-white text-blackk'>CONNECT</button>
                        </div>
                    </div>
                    <img src={prefer?.photoes[0]} alt="" className='w-min h-auto object-cover filter brightness-100' />
                    <div class="absolute inset-0 bg-gradient-stop-30"></div>
                    {currentUser && prefer ?
                        <div className='w-full absolute bottom-20 flex flex-col text-white space-y-9 px-10 ' >
                            <div className=''>
                                <h1 className='match-text'>{currentUser.name}</h1>
                                <p className='drop-shadow-md'>{currentUser.age} years</p>
                            </div>
                            <div>
                                <h1 className='match-text '>About</h1>
                                <p className='max-w-xl'>{prefer.bio}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Course</h3>
                                    <p>{prefer.course}</p>
                                </div>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Movies</h3>
                                    <p>{prefer.movies}</p>
                                </div>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Music</h3>
                                    <p>{prefer.music}</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Hobbies</h3>
                                    <p>{prefer.hobbies}</p>
                                </div>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Personality</h3>
                                    <p>{prefer.course}</p>
                                </div>
                                <div className='w-1/3'>
                                    <h3 className='match-text'>Sociality</h3>
                                    <p>{prefer.sociality}</p>
                                </div>
                            </div>
                        </div> : ""}
                </div>
            </div>
            <Features/>
        </div>
    )
}

export default Matches
