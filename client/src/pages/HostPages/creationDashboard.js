import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";
import { Container, Col, Row, ListGroup} from 'react-bootstrap';
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
        <Container>
            <ParticipantDisplay>
                <h1>Users Currently Joined:</h1>
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
                        

                         {/* <li className="list-group-item list-group-item-action">LUL</li> */}
                        {/* <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li>
                        <li className="list-group-item list-group-item-action">LUL</li> */}

                        </ParticipantList>
                </ParticipantDisplay>
                <Button variant="primary" onClick={startNetworking}>Start the session!</Button>{' '}

            </Container>


            <h1>
                Questions Prompts:
            </h1>
            <div class="card card-body">
            <QuestionForm />
            </div>
            </DashboardDiv>
        </DashboardBody>
    );
};


const ParticipantDisplay = styled.div`
    display: block;
    max-height: 315px;
`;

const Participant = styled(ListGroup.Item)`
    cursor: auto;
    outline: none;
`;

const ParticipantList = styled(ListGroup)`
    overflow: hidden;
    overflow-y: scroll;
    list-style-position: inside;
    max-height: 100%;
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