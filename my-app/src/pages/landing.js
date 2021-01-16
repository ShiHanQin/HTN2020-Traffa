import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import styled from "styled-components";
import { BrowserRouter as Route, Link } from "react-router-dom";

const socket = io("http://localhost:3001")


const Landing = ({}) => {
    const [name, setName] = useState('');

    useEffect(() => {
    }, [])  
    

    const handleSubmitName = () => {
        //do stuff w name
        socket.emit('createlobby', 'testlobby')
        socket.emit('createlobby', 'testlobby2')

        socket.emit('userjoin', 'user', 'testlobby')
        socket.emit('userjoin', 'user2', 'testlobby')
        socket.emit('userjoin', 'user3', 'testlobby')
        //socket.emit(userAction, generatedUserId, generatedLobbyCode)
        //userAction - userjoin, createLobby, etc.


        console.log(name);
    }

    const handleNameChange = ({target: {value}}) => {
        setName(value);
    }

    return (
    <LandingBody>
        <LandingDiv>
            <h1>
                Traffa
            </h1>
            <NameInput onChange={handleNameChange} placeholder="Enter a name">
                
            </NameInput>
            <LandingButton>
                <ButtonLink to={"/nameScreen/" + name} /*TEMPORARY*/ onClick={handleSubmitName}>Enter</ButtonLink>
            </LandingButton>

            <LandingButton>
                <ButtonLink to="/hostDashboard">Host</ButtonLink>
            </LandingButton>

        </LandingDiv>
    </LandingBody>
    );
};

const NameInput = styled.input`
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

export default Landing;


