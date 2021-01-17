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


const initQuestions = [];

const RoomInterface = () => {
    const API_KEY = process.env.REACT_APP_OPENTOK_API_KEY;

    const [data, setData] = useState()
    const [questions, setQuestions] = useState([])
    const [isReady, toggleIsReady] = useState(false);
    const [questionsIndex, setQuestionsIndex] = useState(0);
    const context = useContext(UserContext);

    const questionLeft = () => {
        if (questionsIndex === 0) {
        } else {
            setQuestionsIndex(questionsIndex - 1);
        }
    }

    const questionRight = () => {
        if (questionsIndex === questions.length - 1) {
        } else {
            setQuestionsIndex(questionsIndex + 1);
        }
    }

    const [isChatOpen, setIsChatOpen] = useState(true);

    useEffect(() => {
        socket.on('questions', (questions) => {
            console.log(questions)
            if(questions){
                setQuestions(questions)
            }
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
        console.log(questions);
    }, [])


    return (
<>
        {isReady && data ? 
            <PageDiv>
                    <VideoChat API_KEY={API_KEY} SESSION_ID={data.sessionId}  TOKEN={data.token} />
                    <PromptDiv>
                        <PromptFlex>
                            <DirectionButton onClick={questionLeft}>{"<-"}</DirectionButton>
                            {questions.length !== 0 ? questions[questionsIndex].prompt : "No prompts given."}
                            <DirectionButton onClick={questionRight}>{"->"}</DirectionButton>
                        </PromptFlex>
                    </PromptDiv>
            {/* {isChatOpen && <RoomDiv>
                <ChatBox />
            </RoomDiv>} */}
            </PageDiv>
            :
            <Spinner animation="grow" />
        }
        {/* <div>{convertTime(timeRemaining)}</div> */}
        {/* <ToggleChatButton onClick={() => setIsChatOpen(!isChatOpen)}>
            Toggle Chat
        </ToggleChatButton> */}
        
        </>

    )
}

const DirectionButton = styled.button`
    margin-top: auto;
    margin-bottom: auto; 
    width: 60px;
    border-radius: 20px;
    background-color: #ff8f00;
    border: none;
    outline: none;
    color: white;
    height: 40px;
    margin: 8px;
    transition: none;
    }
    
    :focus {
        outline: none;
        background-color: #ff8f00;
    } 

    
`;

const PageDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const PromptDiv = styled.div`
    height: 10vh;
    width: 100%;
    background: #FFD7A6;
`;

const PromptFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

`;

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