import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const AboutMe = ({ aboutData }) => {
    const [enums, setEnums] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [course, setCourse] = useState("");
    const [personality, setPersonality] = useState("");
    const [sociality, setSociality] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/prefer/enums`)
            .then(res => setEnums(res.data))
            .catch(err => console.error(err))
    }, [])
    useEffect(() => {
        if (aboutData) {
            setCourse(aboutData.course)
            setPersonality(aboutData.personality)
            setSociality(aboutData.sociality)
        }
        // console.log(course, personality, sociality, "sd")
    }, [aboutData])


    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        await axios.put(`${process.env.REACT_APP_API_URL}/prefer/about`, { course, personality, sociality }, { headers })
            .then(res => {
                setCourse(res.data.course)
                setPersonality(res.data.personality)
                setSociality(res.data.sociality)
                console.log("success")
            })
            .catch(err => console.error(err))
        setIsLoading(false);
    }

    return (
        <div className="w-full max-w-6xl flex flex-col p-2 my-5">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">About Me</h1>
                    <button onClick={submitForm} className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Save" : "Saving..."}</button>
                </div>
                <div className='w-full bg-white'>
                    <form className='flex justify-between p-2 border-[1px] border-blackk rounded-lg'>
                        <label htmlFor="Course" className="flex flex-col w-1/3">
                            <select name="Course" id="Course" className="input-form" value={course} onChange={(e) => setCourse(e.target.value)}>
                                <option value="">Your Course Here</option>
                                {enums && enums.course.map((eCourse) => {
                                    return <option key={eCourse} value={eCourse}>{eCourse}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Personality" className="flex flex-col w-1/3">
                            <select name="Personality" id="Personality" className="input-form" value={personality} onChange={(e) => setPersonality(e.target.value)}>
                                <option value="">Your Personality Here</option>
                                {enums && enums.personality.map((ePersonality) => {
                                    return <option key={ePersonality} value={ePersonality} className=''>{ePersonality}</option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="Sociality" className="flex flex-col w-1/3">
                            <select name="Sociality" id="Sociality" className="input-form" value={sociality} onChange={(e) => setSociality(e.target.value)}>
                                <option value="">Your Sociality Here</option>
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
