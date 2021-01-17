import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";
import { Container } from 'react-bootstrap';
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
        <div class="container">
            
            <div class="container">

                <div>
                    Users Currently Joined:
                    <ul>
                        {joinedUsers && joinedUsers.map((user) => 
                            <li>{user}</li>
                        )}
                    </ul>
                </div>

                <button onClick={startNetworking}>Start Networking!</button>

            </div>
            <div class="container">
            <h1>Welcome to the Host Dashboard</h1>
                <h1>Lobby Code: {lobbyCode}</h1> {/* should autogenerate */}
            </div>
            <div class="container">
            <div class="alert alert-primary" role="alert"> Wassup </div>
            <QuestionForm />
            </div>
        </div>
    );
};

export default CreationDashboard;