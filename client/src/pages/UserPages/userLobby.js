import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { socket } from '../../utils/index'
import { UserContext } from '../../context/user';
import styled from "styled-components";
import Sky from "react-sky";
import img0 from "../../media/online-lesson.svg";

const Lobby = () => {
    const [joinedUsers, setJoinedUsers] = useState([])
    const context = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        socket.on('userjoined', (users) => {
            setJoinedUsers(users);
        })
        socket.on('joinedroom', (data) => {
            context.sessionId.setValue(data.sessionId);
            context.token.setValue(data.token);
            history.push('/room')
        })

        if (context.userId.value && context.roomCode.value) {
            socket.emit('reconnect', context.userId.value, context.roomCode.value);

        }

        window.addEventListener('beforeunload', (event) => {
            socket.emit('userleave', context.userId.value, context.roomCode.value);
            });

        window.onbeforeunload = function(){
            return '';
            };
    }, [])

    return (
      <PageDiv>
        <Sky
          style={{ order: "-1", position: "absolute" }}
          images={{
            0: img0,
          }}
          how={
            80
          } /* Pass the number of images Sky will render chosing randomly */
          time={15} /* time of animation */
          size={"120px"} /* size of the rendered images */
          background={"#FFD7A6"} /* color of background */
        />
        <PaperCard className="scale-up-center">
          <Title>WELCOME TO THE LOBBY</Title>
          <Joined>{joinedUsers.length} people have joined ...</Joined>
          <UserSpace>
            Fellow Participants:
            {/* <ul> */}
                {joinedUsers && joinedUsers.map((user) => <UserCard><p>{user}</p></UserCard>)}
                {/* </ul> */}
          </UserSpace>
        </PaperCard>
      </PageDiv>
    ); 
}

const UserSpace = styled.div`
  height: 100%;
  overflow: hidden;
    overflow-y: auto;
`;

const UserCard = styled.div`
  width: 150px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: black;
`;

const Joined = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: orange;
`;

const PaperCard = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
`;

export default Lobby;      
