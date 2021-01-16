import React from "react";
import styled from "styled-components";

const NameScreen = ({}) => {
    return (
        <NameScreenBody>
            <NameScreenDiv>
                <h1>Hi i'm NameScreen</h1>
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
