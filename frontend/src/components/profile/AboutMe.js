import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AboutMe = () => {
    const [enums, setEnums] = useState(null);
    const [course, setCourse] = useState(null);
    const [personality, setPersonality] = useState(null);
    const [sociality, setSociality] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/prefer/enums`)
            .then(res => setEnums(res.data))
            .catch(err => console.error(err))

    }, [])


    return (
        <div className="w-full max-w-6xl flex flex-col p-2 my-5">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">About Me</h1>
                    <button className='btn bg-secondary'>Save</button>
                </div>
                <div className='w-full bg-white'>
                    <form className='flex justify-between p-2 border-[1px] border-blackk rounded-lg'>
                        <label htmlFor="Course" className="flex flex-col w-1/3">
                            <select name="Course" id="Course" className="input-form" defaultValue="None" onChange={(e) => setCourse(e.target.value)}>
                                <option value="None">Your Course Here</option>
                                {enums && enums.course.map((eCourse) => {
                                    return <option key={eCourse} value={eCourse}>{eCourse}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Peronality" className="flex flex-col w-1/3">
                            <select name="Peronality" id="Peronality" className="input-form" defaultValue="None" onChange={(e) => setPersonality(e.target.value)}>
                                <option value="None">Your Personality Here</option>
                                {enums && enums.personality.map((ePersonality) => {
                                    return <option key={ePersonality} value={ePersonality} className=''>{ePersonality}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Sociality" className="flex flex-col w-1/3">
                            <select name="Sociality" id="Sociality" className="input-form" defaultValue="None" onChange={(e) => setCourse(e.target.value)}>
                                <option value="None">Your Sociality Here</option>
                                {enums && enums.sociality.map((eSociality) => {
                                    return <option key={eSociality} value={eSociality} >{eSociality}</option>
                                })}
                            </select>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AboutMe
