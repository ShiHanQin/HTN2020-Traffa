import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Route, Link } from "react-router-dom";

const Landing = ({}) => {
    const [isValid, setIsValid] = useState(true);


    return (
    <LandingBody>
        <LandingDiv>
            <h1>
                Traffa
            </h1>

                <EnterButton>
                    <Link to="/nameScreen">Enter</Link>
                </EnterButton>

                <HostButton>
                    <Link to="/hostDashboard">Host</Link>
                </HostButton>

        </LandingDiv>
    </LandingBody>
    );
};

const ButtonLink = styled(Link)`
    
`;

const HostButton = styled.button`
    padding: 10px;
`;

const EnterButton = styled.button`
    padding: 10px;
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


