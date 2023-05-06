import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Details from '../components/profile/Strength';
import Photos from '../components/profile/Photos';

const Profile = () => {
    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/detail/${id}`)
            .then(res => {
                setCurrentUser(res.data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="w-full flex flex-col items-center px-4">
            <Details />
            <Photos user={currentUser}/>
        </div>
    )
}

export default Profile
