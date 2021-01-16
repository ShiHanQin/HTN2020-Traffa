import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";

const CreationDashboard = ({}) => {
    const [questionsArr, setQuestionsArr] = useState([])
    const [lobbyCode, setLobbyCode] = useState(uuidv4().slice(0, 6).toUpperCase())
    const [joinedUsers, setJoinedUsers] = useState([])

    useEffect(() => {
        socket.emit('createlobby', lobbyCode)

        socket.on('userjoined', (users) => {
            console.log(users)
            setJoinedUsers(users);
        })
    }, [])

    const handleSaveOptions = () => {
        //sendState()
    }

    return (
        <CreationDashBody>
            <CreationDashDiv>
                <h1>Welcome to the Host Dashboard</h1>
                <h1>Lobby Code: {lobbyCode}</h1> {/* should autogenerate */}
                <QuestionForm />
                {/* <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Question and Duration (seconds)</span>
                    </div>
                    <input type="text" className="form-control"></input>
                    <input type="text" className="form-control"></input>
                </div>  */}
                <div>
                    Users Currently Joined:
                    <ul>
                        {joinedUsers && joinedUsers.map((user) => 
                            <li>{user}</li>
                        )}
                    </ul>
                </div>
            </CreationDashDiv>
        </CreationDashBody>
    );
};

const CreationDashBody = styled.div`
    height: 100vh;
`;

const CreationDashDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export default CreationDashboard;
