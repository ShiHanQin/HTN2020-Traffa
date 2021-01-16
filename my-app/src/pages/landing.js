import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import styled from "styled-components";
import { useHistory, BrowserRouter as Route, Link } from "react-router-dom";

const socket = io("http://localhost:3001")


const Landing = ({}) => {
    const [code, setCode] = useState('');

    useEffect(() => {
    }, [])  
    
    const history = useHistory();

    const handleSubmitCode = () => {
        //do stuff w name
        socket.emit('createlobby', 'testlobby')
        socket.emit('userjoin', code, 'testlobby');
        
        socket.on('numofusers', (msg) => {
            console.log(msg)
        })

        socket.on('exception', (msg) => {
            if (!msg.error){
                console.log("o_o");
            } else {
                console.log(msg);
                console.log("I eat noobs");
            }
        });
        
        socket.on('message', (msg) => {
            console.log(msg)
        })

        
        //socket.emit(userAction, generatedUserId, generatedLobbyCode)
        //userAction - userjoin, createLobby, etc.
        console.log('grief?');

        history.push("/nameScreen/" + code);

        console.log(code);
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
                <ButtonLink to="/hostDashboard">Host</ButtonLink>
            </LandingButton>

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

export default Landing;


