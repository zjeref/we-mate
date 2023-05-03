import React, { useContext, useState } from 'react'
import signuplogo from '../../assets/signup.svg'
import { GlobalState } from '../../middlewares/global-states'

const Signup = () => {
    const { dispatch } = useContext(GlobalState)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [avatar, setAvatar] = useState('');

    const closeModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'activeModal', payload: "" })
    }
    return (
        <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
            <div className="w-1/2">
                <form action="" className='p-8'>
                    <div className="space-y-3">
                        <label htmlFor="name" className="flex flex-col">
                            <span className="">Name</span>
                            <input type="text" id='name' className="input-form" />
                        </label>
                        <label htmlFor="email" className="flex flex-col">
                            <span className="">Email</span>
                            <input type="email" id='email' className="input-form" />
                        </label>
                        <label htmlFor="password" className="flex flex-col">
                            <span className="">Password</span>
                            <input type="password" id='password' className="input-form" />
                        </label>
                        <label htmlFor="age" className="flex flex-col">
                            <span className="">Age</span>
                            <input type="number" id='name' className="input-form" />
                        </label>
                        <label htmlFor="gender" className="flex flex-col">
                            <span className="">Gender</span>
                            <select name="gender" id="gender" className="input-form">
                                <option value="">Preferred not to say</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label htmlFor="avatar" className="flex flex-col">
                            <span className="">Profile image</span>
                            <input type="file" id='avatar' className="" />
                        </label>

                    </div>
                    <div className='flex justify-between mt-8'>
                        <button type='cancel' className='px-8 py-2 border-[1px] border-slate-500 rounded-md text-sm text-slate-500 font-semibold'
                            onClick={(e) => closeModal(e)}
                        >
                            Back
                        </button>
                        <button type="submit" className='btn bg-secondary font-semibold'>Submit</button>
                    </div>

                </form>
            </div>
            <div className='w-1/2 bg-primary flex p-8'>
                <img src={signuplogo} alt="signup-logo" />
            </div>
        </div>
    )
}

export default Signup
