import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { v4 as uuidv4 } from "uuid";
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './dashboard.css'

import Person from '../../media/user.svg'
import List from '../../media/list.svg'
import Question from '../../media/request.svg'
import Duration from '../../media/duration.svg'
import Settings from '../../media/settings.svg'

const CreationDashboard = ({}) => {
    const [questionsArr, setQuestionsArr] = useState([])
    const [lobbyCode, setLobbyCode] = useState(uuidv4().slice(0, 6).toUpperCase())
    const [roomDuration, setRoomDuration] = useState(300)
    const [joinedUsers, setJoinedUsers] = useState([])

    const handleDurationChange = ({ target: { value } }) => {
        setRoomDuration(value);
        console.log("grief1");
        console.log(value);
    };

    useEffect(() => {
        socket.emit('createlobby', lobbyCode)

        socket.on('userjoined', (users) => {
            console.log(users)
            setJoinedUsers(users);
        })
    }, [lobbyCode])

    const startNetworking = () => {
        socket.emit('setQuestions', questionsArr, lobbyCode)

        socket.emit('startapp', lobbyCode)
    }

    const setDuration = () => {
        socket.emit('setRoomDuration', roomDuration)
    }

    const handleSetQuestions = (questions) => {
        setQuestionsArr(questions)
    }

    const handleSaveOptions = () => {
        //sendState()
    }

    const removeUser = (user) => {
        console.log(user)
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <SectionCard>
                            <CardHeader>Host Dashboard</CardHeader>
                            <CardBody>Lobby Code {lobbyCode}</CardBody>
                            <StartSessionButton variant="primary" onClick={startNetworking}>Start the session!</StartSessionButton>
                        </SectionCard>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SectionCard>
                            <div style={{verticalAlign: 'middle'}}>
                                <CardImageWrapper>
                                    <img src={List} alt="list" style={{float: 'right', height: 'auto'}} /> 
                                </CardImageWrapper>
                                <CardHeader style={{'margin-left': '10px'}}>List of Current Users</CardHeader>
                                <CardBody>
                                    <ParticipantList>
                                        {joinedUsers && joinedUsers.map((user) => 
                                            <Participant onClick={removeUser}>{user}</Participant>             
                                        )}
                                    </ParticipantList>
                                    
                                </CardBody>
                                
                            </div>
                        </SectionCard>
                    </Col>
                    <Col>
                        <SectionCard>
                            <div style={{verticalAlign: 'middle'}}>
                                <CardImageWrapper>
                                    <img src={Person} alt="person" style={{float: 'right', height: 'auto'}} /> 
                                </CardImageWrapper>
                                <CardHeader style={{'margin-left': '10px'}}>Users Currently Joined</CardHeader>
                            </div>
                            <CardBody>{joinedUsers.length}</CardBody>
                        </SectionCard>
                        <SectionCard>
                            <div style={{verticalAlign: 'middle'}}>
                                <CardImageWrapper>
                                    <img src={Duration} alt="duration" style={{float: 'right', height: 'auto'}} /> 
                                </CardImageWrapper>
                                <CardHeader style={{'margin-left': '10px'}}>Duration of Each Call</CardHeader>
                                <DurationLabel>(in seconds)</DurationLabel>
                            </div>
                            <CardBody>
                                <DurationInput
                                    type="number"
                                    value={roomDuration}
                                    onChange={handleDurationChange}
                                /> 
                            </CardBody>
                        </SectionCard>
                        <SectionCard>
                            <div style={{verticalAlign: 'middle'}}>
                                <CardImageWrapper>
                                    <img src={Settings} alt="settings" style={{float: 'right', height: 'auto'}} /> 
                                </CardImageWrapper>
                                <CardHeader style={{'margin-left': '10px'}}>Other Options:</CardHeader>
                            </div>
                            <CardBody>
                                <form>
                                    <div>
                                        <input type="checkbox" id="matches" />
                                        <label for="matches" style={{fontSize: '14px', marginLeft: '5px'}}>Match users multiple times</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="password" />
                                        <label for="password" style={{fontSize: '14px', marginLeft: '5px'}}>Set a password for your lobby</label>        
                                    </div>
                                </form>
                            </CardBody>
                        </SectionCard>
                    </Col>
                    <Col>
                        <SectionCard>
                            <div style={{verticalAlign: 'middle'}}>
                                <CardImageWrapper>
                                    <img src={Question} alt="question" style={{float: 'right', height: 'auto'}} /> 
                                </CardImageWrapper>
                                <CardHeader style={{'margin-left': '10px'}}>Question Prompts</CardHeader>
                                <CardBody>
                                    <QuestionForm setQuestionsArr={handleSetQuestions}/>
                                </CardBody>
                            </div>
                        </SectionCard>
                    </Col>
                </Row>
            </Container>
        </>
    );

    
    // return (
    //     <DashboardBody>
    //         <DashboardDiv>
    //             <HeaderDiv>
                    
    //             </HeaderDiv>
    //             <SplitDiv>
    //                 <SectionDiv>
    //                 </SectionDiv>
    //                 <SectionDiv>
    //                 </SectionDiv>
    //             </SplitDiv>
    //             <SplitDiv>
    //                 <SectionDiv>
    //                     <SectionCard>
    //                         <CardHeader>Users Currently Joined: {joinedUsers.length}</CardHeader>
    //                             {joinedUsers && joinedUsers.map((user) => 
    //                                 <Participant>{user}</Participant>)}
    //                     </SectionCard>
    //                 </SectionDiv>  
    //                 <SectionDiv>
    //                     <SectionCard>
    //                         <CardHeader>Lobby Code</CardHeader>
    //                         <CardBody>{lobbyCode}</CardBody>
    //                     </SectionCard>
    //                 </SectionDiv>   
    //                 <SectionDiv>
    //                     <SectionCard>
    //                         <CardHeader>Question Prompts: </CardHeader>
    //                         <QuestionForm />
    //                     </SectionCard>
    //                 </SectionDiv>
    //             </SplitDiv>
    //             <SplitDiv>
    //                 <StartSessionButton variant="primary" onClick={startNetworking}>Start the session!</StartSessionButton>
    //                 <DurationLabel>Duration (seconds):</DurationLabel>
    //                 <DurationInput
    //                     type="number"
    //                     value={roomDuration}
    //                     onChange={handleDurationChange}
    //                 /> 
    //             </SplitDiv>
    //         </DashboardDiv>
    //     </DashboardBody>
    // );
};

const CardImageWrapper = styled.div`
    width: 16px;
    height: 16px;
    display: inline-block;
`

const SectionCard = styled.div`
    margin-top: 15px;
    border-radius: 13px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    padding: 20px 50px;
    justify-content: center;
`

const CardBody = styled.div`
    font-weight: 600;
    font-size: 32px;
    margin: 10px 0px;
`

const CardHeader = styled.div`
    font-weight: 600;
    font-size: 18px;
    display: inline-block;

`

const DurationLabel = styled.label`
    font-size: 13px;
`;

const DurationInput = styled.input`
    width: 80px;
    height: 40px;
    justify-self: flex-start;
    border: none;
`;

const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const Header = styled.h1`
    font-size: 36px;
    font-weight: 700;
    text-align: center;
`;

const StartSessionButton = styled(Button)`
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
`;

const SplitDiv = styled.div`
    display: flex;
    height: 100%;
`;

const SectionDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 20px;
    padding-right: 20px;
`;

const Participant = styled(ListGroup.Item)`
    cursor: pointer;
    outline: none;
    border: none;

    :before, :after {
        content: '';
        position: absolute;
        width: 0%;
        height: 1px;
        top: 50%;
        margin-top: -0.5px;
        background: black;
    }
      
    :before {
        left: -2.5px;
    }
    
    :after {
        right: 2.5px;
        background: black;
        transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
    }

    :hover:before {
        background: black;
        width: 100%;
        transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    }

    :hover:after {
        background: transparent;
        width: 100%;
        transition: 0s;
      }
`;

const ParticipantList = styled(ListGroup)`
    font-size: 16px;
    outline: none;
    overflow: hidden;
    overflow-y: auto;
    list-style-position: inside;
    height: calc(100vh - 220px);
`;

const DashboardBody = styled.div`
    height: 100vh
    width: 100%;
`;

const DashboardDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default CreationDashboard;
