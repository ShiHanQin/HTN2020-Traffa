import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { socket } from '../../utils/index'
import { UserContext } from '../../context/user';
import { Spinner } from 'react-bootstrap'

const Lobby = () => {
    const [joinedUsers, setJoinedUsers] = useState([])
    const context = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        socket.on('userjoined', (users) => {
            console.log(users)
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
        <div>
            <h1>Welcome to the Lobby, we will begin soon! :)</h1>

            <h1>{joinedUsers.length} have joined ...</h1>

            <div>
            {/* <Spinner animation="grow" /> */}
                Users Currently Joined:
                
                <ul>{joinedUsers && joinedUsers.map((user) => <li>{user}</li>)}</ul>
            </      div>
        </div>        
        ); 
    }

export default Lobby;      
