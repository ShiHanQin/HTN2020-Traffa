import React from "react";
import styled from "styled-components";

const HostDashboard = ({}) => {
    return (
        <HostDashboardBody>
            <HostDashboardDiv>
                <h1>Hi i'm HostDashboard</h1>
            </HostDashboardDiv>
        </HostDashboardBody>
    );
};

const HostDashboardBody = styled.div`
    height: 100vh;
`;

const HostDashboardDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export default HostDashboard;
