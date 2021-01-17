import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { socket } from '../utils/index'
import { useHistory, BrowserRouter as Route, Link } from "react-router-dom";
import { UserContext } from '../context/user';
import Sky from "react-sky";
import img0 from "../media/dialogue.svg";
import img1 from "../media/chat.svg";
import img2 from '../media/smartphone.svg';
import img3 from '../media/ericlogosvg.svg';
import Logo from '../media/logo.png';

const Landing = ({}) => {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [placeholder, updatePlaceholder] = useState('Enter your code here')
    const context = useContext(UserContext);

    useEffect(() => {
    }, [])  
    
    const history = useHistory();

    const handleSubmitCode = () => {
        const userId = uuidv4().slice(0, 6).toUpperCase();

        //do stuff w name
        socket.emit('userjoin', userId, code);

        socket.once('userJoinStatus', (status) => {
            if (!status.error){
                history.push("/nameScreen/" + code);
                context.userId.setValue(userId);
                context.roomCode.setValue(code)
            } else {
                setErrorMessage(status.errorMessage)
            }
        });

        //socket.emit(userAction, generatedUserId, generatedLobbyCode)
        //userAction - userjoin, createLobby, etc.
    }

    const handleCodeChange = ({target: {value}}) => {
        setCode(value);
    }

    return (
      <>
        <LandingBody>
          <LandingDiv>
            <Sky
              style={{ order: "-1", position: "absolute" }}
              images={{
                0: img0,
                1: img1,
                2: img2,
                3: img3
              }}
              how={
                150
              } /* Pass the number of images Sky will render chosing randomly */
              time={30} /* time of animation */
              size={"75px"} /* size of the rendered images */
              background={"#2C2B27"} /* color of background */
            />
            <PaperCard className="scale-up-center">
              <img src={Logo} alt="Logo" />
              <CodeInput
                onChange={handleCodeChange}
                placeholder={placeholder}
                onFocus={() => updatePlaceholder('')}
                onBlur={() => updatePlaceholder('Enter your code here')}
              />
                <LandingButton onClick={() => history.push('/creationDashboard')}>Host</LandingButton>
              <LandingButton onClick={handleSubmitCode}>Enter</LandingButton>
              <div>Host your own Traffa!</div>
              <ErrorMessage>{errorMessage && errorMessage}</ErrorMessage>
            </PaperCard>
          </LandingDiv>
        </LandingBody>
      </>
    );
};



const CodeInput = styled.input`
    line-height: 40px;
    width: 80%;
    padding: 0px 10px;
    border-radius: 12px;
    border-width: 1px;
`;


const LandingButton = styled.button`
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

const PaperCard = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);

`

const ErrorMessage = styled.h3`
    color: red;
`

export default Landing;



