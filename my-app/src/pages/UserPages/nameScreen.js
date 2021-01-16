import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";


const NameScreen = ({}) => {
    let { name } = useParams(); //TEMPORARY

    return (
        <NameScreenBody>
            <NameScreenDiv>
                <h1>Hi {name}, I'm dad</h1>
            </NameScreenDiv>
        </NameScreenBody>
    );
};

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

export default NameScreen;
