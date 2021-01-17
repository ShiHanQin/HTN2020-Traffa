import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { socket } from '../utils/index'
import { useHistory, BrowserRouter as Route, Link } from "react-router-dom";
import { UserContext } from '../context/user';
import Sky from "react-sky";

import myImage from "./media/myImage.png";

const Landing = ({}) => {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const context = useContext(UserContext);

    useEffect(() => {
    }, [])  
    
    const history = useHistory();

    const handleSubmitCode = () => {
        const userId = uuidv4().slice(0, 6).toUpperCase();

        //do stuff w name
        socket.emit('userjoin', userId, code);

        socket.once('userJoinStatus', (status) => {
            if (!status.error){
                history.push("/nameScreen/" + code);
                context.userId.setValue(userId);
                context.roomCode.setValue(code)
            } else {
                setErrorMessage(status.errorMessage)
            }
        });

        //socket.emit(userAction, generatedUserId, generatedLobbyCode)
        //userAction - userjoin, createLobby, etc.
    }

    const handleCodeChange = ({target: {value}}) => {
        setCode(value);
    }

    return (
    <LandingBody>
        <LandingDiv>
            <h1>
                Traffa
            </h1>
            <CodeInput onChange={handleCodeChange} placeholder="Enter a room code">
                
            </CodeInput>
            <LandingButton onClick={handleSubmitCode} >
                Enter
            </LandingButton>

            <LandingButton>
                <ButtonLink to="/creationDashboard">Host</ButtonLink>
            </LandingButton>
            <ErrorMessage>{errorMessage && errorMessage}</ErrorMessage>
        </LandingDiv>
    </LandingBody>
    );
};

const CodeInput = styled.input`
    line-height: 32px;
    width: 222px;
`;

const ButtonLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 20px;
`;

const LandingButton = styled.button`
    padding: 10px;
    border: none;
    background: #ed7d3a;
    border-radius: 8px;
    margin: 8px;
    width: 230px;
`;

const LandingBody = styled.div`
height: 100vh;
`;

const LandingDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
height: 100%;
`;

const ErrorMessage = styled.h3`
    color: red;
`

export default Landing;


