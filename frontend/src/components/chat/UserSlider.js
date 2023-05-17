import React, { useContext } from 'react';
import { GlobalState } from '../../middlewares/global-states';

const UserSlider = ({ user }) => {
    const { dispatch } = useContext(GlobalState);

    const handleUserClick = () => {
        dispatch({ type: "CURRENT_CHAT", payload: user });
    };
    return (
        <>
            {user && (
                <div className="w-full flex space-x-2 p-2 bg-blackShade cursor-pointer my-2 rounded-md" onClick={(e) => handleUserClick()}>
                    <img src={user.preference.photoes[0]} alt="" className='w-10 h-10 rounded-full' />
                    <p className="capitalize">{user.name}</p>
                </div>
            )}
        </>
    );
};

export default UserSlider;
