import React, { useState, useEffect } from 'react';
import Slider from '../components/chat/Slider';
import Header from '../components/chat/Header';

import ChatSlider from '../components/chat/ChatSlider';

const Chats = () => {
    return (
        <div className="w-full flex flex-col items-center ">
            <Header />
            <div className="w-full max-w-6xl flex">
                <Slider />
                <ChatSlider />
            </div>
        </div>
    )
}

export default Chats
