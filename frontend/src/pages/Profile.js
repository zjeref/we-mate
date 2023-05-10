import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Strength from '../components/profile/Strength';
import Photos from '../components/profile/Photos';
import Bio from '../components/profile/Bio';
import AboutMe from '../components/profile/AboutMe';
import Interests from '../components/profile/Interests';
import Cookies from 'js-cookie';

const Profile = () => {
    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [prefer, setPrefer] = useState(null)

    useEffect(() => {
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.get(`${process.env.REACT_APP_API_URL}/prefer/`, { headers })
            .then(res => setPrefer(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="w-full flex flex-col items-center px-4">
            {prefer &&
                <>
                    <Strength photosData={prefer.photoes} />
                    <Photos photosData={prefer.photoes} />
                    <Bio bioData={prefer.bio} />
                    <AboutMe aboutData={prefer}/>
                    <Interests interestData={prefer} />
                </>
            }
        </div>
    )
}

export default Profile
