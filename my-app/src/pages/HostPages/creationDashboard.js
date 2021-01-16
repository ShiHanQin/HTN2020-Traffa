import React, { useEffect } from "react";
import styled from "styled-components";

const CreationDashboard = ({}) => {

    const [questionsArr, setQuestionsArr] = 

    useEffect(() => {
        //fetchData
    }, [])

    const handleSaveOptions = () => {
        //sendState()
    }

    return (
        <CreationDashBody>
            <CreationDashDiv>
                <h1>Welcome to the Host Dashboard</h1>
                <h1>Room Code: 87HUYUG89</h1> {/* should autogenerate */}
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="">Question and Duration (seconds)</span>
                    </div>
                    <input type="text" class="form-control"></input>
                    <input type="text" class="form-control"></input>
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
