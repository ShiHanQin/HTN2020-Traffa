import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";
import { Container, ListGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './dashboard.css'

const CreationDashboard = ({}) => {
    const [questionsArr, setQuestionsArr] = useState([])
    const [lobbyCode, setLobbyCode] = useState(uuidv4().slice(0, 6).toUpperCase())
    const [roomDuration, setRoomDuration] = useState()
    const [joinedUsers, setJoinedUsers] = useState([])

    useEffect(() => {
        socket.emit('createlobby', lobbyCode)

        socket.on('userjoined', (users) => {
            console.log(users)
            setJoinedUsers(users);
        })
    }, [])

    const startNetworking = () => {
        socket.emit('startapp', lobbyCode)
    }

    const setDuration = () => {
        socket.emit('setRoomDuration', roomDuration)
    }

    const handleSaveOptions = () => {
        //sendState()
    }

    return (
        <DashboardBody>
        <DashboardDiv>
        <Container>
            <h1 class="lobbyhead">Lobby Code: {lobbyCode}</h1>
        </Container>
        <SplitDiv>
            <SectionDiv>
                <p>Users Currently Joined: {joinedUsers.length}</p>
            </SectionDiv>
            <SectionDiv>
                <p>Question Prompts: {joinedUsers.length}</p>
            </SectionDiv>
        </SplitDiv>
        <SplitDiv>
            <SectionDiv>
                    <ParticipantList>
                        {joinedUsers && joinedUsers.map((user) => 
                            <li>{user}</li>
                        )}
                        <Participant>LU1l</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        <Participant>LUl</Participant>
                        
                        </ParticipantList>
                        <Button variant="primary" onClick={startNetworking}>Start the session!</Button>
                </SectionDiv>
                        
            <SectionDiv>
                <QuestionForm />
            </SectionDiv>

            </SplitDiv>
            </DashboardDiv>
        </DashboardBody>
    );
};

const SplitDiv = styled.div`
    display: flex;
    /* height: 100%; */
`;

const SectionDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 20px;
    padding-right: 20px;
`;

const Participant = styled(ListGroup.Item)`
    cursor: auto;
    outline: none;
`;

const ParticipantList = styled(ListGroup)`
    overflow: hidden;
    overflow-y: scroll;
    list-style-position: inside;
    max-height: calc(100vh - 140px);
`;

const DashboardBody = styled(Container)`
    height: 100vh
`;

const DashboardDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

`;

export default CreationDashboard;
