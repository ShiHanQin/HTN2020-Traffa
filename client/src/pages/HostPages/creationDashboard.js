import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";
import { Container, Col, Row} from 'react-bootstrap';
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
        <Container class="heading">
            <h1>Lobby Code: {lobbyCode}</h1>
        </Container>
        <Container>
            <Row>
            <Col>
            <div>
                <h1>Users Currently Joined:</h1>
                    <ul>
                        {joinedUsers && joinedUsers.map((user) => 
                            <li>{user}</li>
                        )}
                    </ul>
                </div>
                <Button variant="primary" onClick={startNetworking}>Start the session!</Button>{' '}
                <Button onClick={startNetworking}>Start Networking!</Button>
            </Col>
            
            <Col>
            <QuestionForm />
            </Col>
            </Row>
            </Container>
        </DashboardBody>
    );
};

const DashboardBody = styled(Container)`
height: 100vh
`;

export default CreationDashboard;