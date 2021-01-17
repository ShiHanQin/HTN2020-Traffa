import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { socket } from '../../../utils';

import Message from './Message';

const ChatBox = () => {
    const [message, setMessage] = useState();
    const [allMessage, setAllMessage] = useState([]);

    useEffect(() => {
        socket.on('receiveChatMsg', (msg) => {
            const newMessage = {
                me: false,
                msg: msg,
            }
            
            setAllMessage((message) => [...message, newMessage])
        })
    }, [])

    const handleInput = ({target: {value}}) => {
        setMessage(value);
    }


    

    const handleSend = () => {
        console.log(message)
        socket.emit('sendChatMsg', message)
        setAllMessage((messages) => [...messages, {me: true, msg: message}])
        setMessage('')
    }

    return (
        <>  
            <ChatArea>
                {allMessage && allMessage.map((message) => {
                    return(
                        <>
                            <Message me={message.me} message={message.msg} />
                        </>
                    )
                })}
            </ChatArea>
            <ChatInput type='text' value={message} onChange={handleInput}/>
            <ChatButton onClick={handleSend}>Send</ChatButton>
        </>
    )
}

export default ChatBox;

const ChatArea = styled.div`
    padding: 10px;
    height: 500px;
`

const ChatInput = styled.input`

`

const ChatButton = styled.button`

`
