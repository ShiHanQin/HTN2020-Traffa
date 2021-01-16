import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { BrowserRouter as Route, Link } from "react-router-dom";

const NameScreen = ({}) => {
    let { code } = useParams(); //TEMPORARY

    const [name, setName] = useState("");

    useEffect(() => {}, []);  

    const handleNameChange = ({ target: { value } }) => {
       setName(value);
    };

    const history = useHistory();

    return (
        <NameScreenBody>
            <NameScreenDiv>

                <h1>Room: {code}</h1>

                <NameInput
                    onChange={handleNameChange}
                    placeholder="Choose a username"
                ></NameInput>

                <LobbyButton onClick={() => history.push('potato')}>
                    Enter
                </LobbyButton> 

            </NameScreenDiv>
        </NameScreenBody>
    );
};

const NameInput = styled.input`
    line-height: 32px;
    width: 222px;
`;

const NameScreenBody = styled.div`
    height: 100vh;
`;

const NameScreenDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

const ButtonLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 20px;
`;

const LobbyButton = styled.button`
    padding: 10px;
    border: none;
    background: #ed7d3a;
    border-radius: 8px;
    margin: 8px;
    width: 230px;
`;
export default NameScreen;
