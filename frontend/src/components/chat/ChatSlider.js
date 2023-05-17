import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../middlewares/global-states';
import socketIOClient from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';

const ChatSlider = () => {
  const { data } = useContext(GlobalState);
  const [matchedUser, setMatchedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setMatchedUser(data.currentChat);
    setCurrentUser(data.loggedUser);

  }, [data.currentChat]);


  useEffect(() => {
    if (matchedUser && Object.keys(matchedUser).length !== 0) {
      const token = Cookies.get("authToken");
      const headers = { "Authorization": "Bearer " + token }
      axios.post(`${process.env.REACT_APP_API_URL}/chat/create`, { targetUserId: matchedUser._id }, { headers })
        .then(res => {
          setChat(res.data)
          setMessages(res.data.messages)
        })
        .catch(err => console.error(err))
    }
  }, [matchedUser])

  const handleMessageSent = async () => {
    const token = Cookies.get("authToken");
    const headers = { "Authorization": "Bearer " + token }

    const sender = currentUser._id;
    const receiver = matchedUser._id;
    const content = text;
    axios.post(`${process.env.REACT_APP_API_URL}/chat/${chat._id}`, { sender, receiver, content }, { headers })
      .then(res => setMessages(res.data.messages))
    setText("");
  }
  // console.log(messages)

  return (
    <>
      {matchedUser && Object.keys(matchedUser).length !== 0 ? (
        <div className="w-2/3 h-[800px]  bg-white ml-3 flex flex-col rounded-3xl">
          <div className="h-[94px] flex space-x-2 items-center pl-6">
            <img src={matchedUser.preference.photoes[0]} alt="" className="w-14 h-14 rounded-lg" />
            <p className="text-xl mb-5 capitalize leading-3">{matchedUser.name}</p>
          </div>
          <div className='bg-background h-full overflow-y-auto'>
            {messages &&
              messages.map((msg) => (
                <div key={msg._id} className="w-full flex my-2 items-center">
                  <div className={`w-full flex ${msg.sender === currentUser._id ? " flex-row-reverse " : ""}`}>
                    <div className='rounded-full overflow-hidden mx-2'>
                      {msg.sender === currentUser._id ?
                        <img src={currentUser.preference.photoes[0]} alt="" className='w-10 h-10 ' /> :
                        <img src={matchedUser.preference.photoes[0]} alt="" className='w-10 h-10 ' />
                      }
                    </div>
                    <p className={`px-4 py-3 ${msg.sender === currentUser._id ? "bg-primaryShade senderRadius" : "bg-blackShade receiverRadius"}`}>{msg.content}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex h-[15%] items-center px-4'>
            <input
              className='w-full border-b-2 border-blackk p-2'
              type="text"
              placeholder="Write a message...."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className='p-2 bg-primary rounded-full text-white px-4' onClick={() => handleMessageSent()}>Send</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatSlider;

