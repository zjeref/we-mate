import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import UserSlider from './UserSlider';

const Slider = () => {
  const [allMatches, setAllMatches] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { "Authorization": "Bearer " + token }
    axios.get(`${process.env.REACT_APP_API_URL}/user/allMatches`, { headers })
      .then(res => setAllMatches(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='w-1/3 bg-white mr-3 p-4 rounded-3xl'>
      <h3 className='text-xl font-bold pb-6 border-b-2 border-blackk'>Messenger</h3>
      {allMatches &&
        allMatches.map((user) => {
          return <UserSlider key={user._id} user={user} />
        })
      }
    </div>
  )
}

export default Slider
