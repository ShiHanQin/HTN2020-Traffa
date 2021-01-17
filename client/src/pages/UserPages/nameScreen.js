import React, { useState, useEffect, useContext} from "react";
import { useParams, useHistory } from 'react-router-dom';
import { socket } from '../../utils/index'
import styled from "styled-components";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { UserContext } from '../../context/user';

const NameScreen = ({}) => {
    let { code } = useParams(); //TEMPORARY

    const [name, setName] = useState("");
    const context = useContext(UserContext);

    const handleNameChange = ({ target: { value } }) => {
       setName(value);
    };

    const submitName = () => {
        const userId = context.userId.value;
        const roomCode = context.roomCode.value;
        socket.emit('chooseName', userId, name, roomCode);
        history.push('/lobby/' + roomCode)
    }
    
    const history = useHistory();

    return (
        <NameScreenBody>
            <NameScreenDiv>

                <h1>Room: {code}</h1>

                <NameInput
                    onChange={handleNameChange}
                    placeholder="Choose a username!"
                ></NameInput>

                <LobbyButton onClick={submitName}>
                    Enter
                </LobbyButton> 

            </NameScreenDiv>
        </NameScreenBody>
    );
};

const NameInput = styled.input`
    line-height: 40px;
    width: 80%;
    padding: 0px 10px;
    border-radius: 12px;
    border-width: 1px;
`;

const NameScreenBody = styled.div`
     display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const NameScreenDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 25%;
`;

const LobbyButton = styled.button`
    color: white;
    padding: 10px;
    border: none;
    background: #ed7d3a;
    margin: 8px;
    width: 80%;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 16px;
    border-radius: 12px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    height: 40px;

    :hover {
        opacity: 50%;
    }
`;

export default NameScreen;
