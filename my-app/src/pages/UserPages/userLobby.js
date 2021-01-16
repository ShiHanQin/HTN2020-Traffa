import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { socket } from '../../utils/index'
import { QuestionForm } from "../index";
import { UserContext } from '../../context/user';

const Lobby = () => {
    const [joinedUsers, setJoinedUsers] = useState([])
    const context = useContext(UserContext);

    useEffect(() => {
        socket.on('userjoined', (users) => {
            console.log(users)
            setJoinedUsers(users);
        })

        if (context.userId.value && context.roomCode.value) {
            socket.emit('reconnect', context.userId.value, context.roomCode.value);

        }

        window.addEventListener('beforeunload', (event) => {
            socket.emit('userleave', context.userId.value, context.roomCode.value);
            });
            
    }, [])

    return (
        <div>
            <h1>
                Welcome to the Lobby, we will begin soon! :)
            </h1>
            
            <h1>
                {joinedUsers.length} have joined ...
            </h1>
            <div>
                    Users Currently Joined:
                    <ul>
                        {joinedUsers && joinedUsers.map((user) => 
                            <li>{user}</li>
                        )}
                    </ul>
                </div>
        </div>
    )
}

// const JoinCount = styled.h1`
// :after {
//   overflow: hidden;
//   display: inline-block;
//   vertical-align: bottom;
//   -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
//   animation: ellipsis steps(4,end) 900ms infinite;
//   content: "\2026"; /* ascii code for the ellipsis character */
//   width: 0px;
// }

// @keyframes ellipsis {
//   to {
//     width: 1.25em;    
//   }
// }

// @-webkit-keyframes ellipsis {
//   to {
//     width: 1.25em;    
//   }
// }
// `;

export default Lobby;