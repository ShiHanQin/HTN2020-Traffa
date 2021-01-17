import React, { useEffect, useState, useContext } from 'react';
import { socket } from '../../utils/index';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import moment from 'moment'

import { UserContext } from '../../context/user';

import ChatBox from './ChatElements/chatBox'
import VideoChat from './ChatElements/videoChat'


const RoomInterface = () => {
    const API_KEY = process.env.REACT_APP_OPENTOK_API_KEY;

    const context = useContext(UserContext);

    const [data, setData] = useState()
    const [timeRemaining, setTimeRemaining] = useState();
    const [isReady, toggleIsReady] = useState(false);

    const [isChatOpen, setIsChatOpen] = useState(true);

    const convertTime = (milliseconds) => {
        let time = moment.duration(milliseconds);
        return `${time.minutes()}:${time.seconds()}`
    }

    useEffect(() => {
        socket.on('questions', (questions) => {
            console.log(questions);
        })

        socket.on('timer', (countdown) => {
            setTimeRemaining(countdown);
        })

        socket.emit('ready')

        if (!context.sessionId.value || !context.token.value) {
            console.log("GRIEFFFFF!");
        } else {
            setData({
                sessionId: context.sessionId.value,
                token: context.token.value
            })
        }

        toggleIsReady(true)
    }, [API_KEY, context.sessionId.value, context.token.value]);

    useEffect(() => {
        socket.emit('reconnect', context.userId.value, context.roomCode.value)

    }, [])


    return (
        <RoomBody>
        {isReady && data ? 
            <>
            <RoomDiv>
                    <VideoChat API_KEY={API_KEY} SESSION_ID={data.sessionId}  TOKEN={data.token} />
            </RoomDiv>
            {isChatOpen && <RoomDiv>
                <ChatBox />
            </RoomDiv>}
            </>
            :
            <Spinner animation="grow" />
        }
        <div>
            {convertTime(timeRemaining)}</div>
        <ToggleChatButton onClick={() => setIsChatOpen(!isChatOpen)}>
            Toggle Chat
        </ToggleChatButton>
        </RoomBody>

    )
}

const ToggleChatButton = styled(Button)`
    height: 20px;
    padding: 15px;
    text-align: center;

`

const RoomBody = styled.div`
    display: flex;
    
    height: 100vh;
`;

const RoomDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 50%;
`;


export default RoomInterface