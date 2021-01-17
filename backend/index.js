require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

const Lobby = require('./lobby.js');

const lobbies = [];
const { SERVER_PORT } = process.env;

io.on('connection', (socket) => {
    /* HOST ACTIONS */

        
    // Create lobby with unique code so that other users can join
    socket.on('createlobby', (lobbyCode) => {
        console.log(`${lobbyCode} created`)
        socket.join(lobbyCode);
        const newLobby = new Lobby(io, lobbyCode);
        
        lobbies.push(newLobby);
    });

    // Pair all users in lobby and start networking
    socket.on('startapp', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.createRooms();
        }
    })

    // End all active 1on1 rooms (Pushes all users back to waiting area)
    socket.on('endrooms', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.endRooms();
        }
    })

    // Close lobby
    socket.on('endlobby', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.endLobby();
        }
    })

    
    /* GLOBAL ACTIONS */
    // Provide information about number of users that are connected for the given lobby
    socket.on('usersconnected', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        const numOfUsers = LobbyToModify.getNumberOfUsers();

        socket.emit('numofusers', numOfUsers);
    })

    // Add user to lobby that was specified
    socket.on('userjoin', (user_id, lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})

        } else {
            socket.join(lobbyCode)
            LobbyToModify.addUserToLobby(io, user_id, socket);
            const numOfUsers = LobbyToModify.getNumberOfUsers();

            io.to(lobbyCode).emit('numofusers', numOfUsers);
            io.to(lobbyCode).emit('message', {message: `${user_id} joined!`});
            io.to(socket.id).emit('userJoinStatus', {errorMessage: '', error: false})
        }
    });

    // Allow user to change nickname stored
    socket.on('chooseName', (user_id, nickname, lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.modifyNickname(user_id, nickname);
            io.to(lobbyCode).emit('userjoined', LobbyToModify.getUsersInLobby())
        }

    });

    socket.on('reconnect', (user_id, lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        
        if (LobbyToModify && LobbyToModify.isUserInLobby(user_id)){
            socket.join(lobbyCode)
            LobbyToModify.updateSocket(user_id, socket)
            io.to(lobbyCode).emit('userjoined', LobbyToModify.getUsersInLobby())

            const inRoom = LobbyToModify.getRooms().find((room) => room.includes(user_id));
            if (inRoom) {
                socket.join(inRoom)
            }
        }
    })

    socket.on('setQuestions', (questions, lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.setQuestions(questions);
        }
    })

    socket.on('setRoomDuration', (duration, lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);

        if (!LobbyToModify) {
            console.log(`Lobby with specified code ${lobbyCode} does not exist!`)
            io.to(socket.id).emit('userJoinStatus', {errorMessage: 'Room does not exist!', error: true})
        } else {
            LobbyToModify.setDuration(duration);
        }
    })

    socket.on('userleave', (user_id, lobbyCode) => {
        // const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        // LobbyToModify.userLeave(user_id, lobbyCode);

        // const numOfUsers = LobbyToModify.getNumberOfUsers();
        // io.to(lobbyCode).emit('numofusers', numOfUsers);
        // socket.leave(lobbyCode);
    });
    
    socket.on('disconnect', (lobbyCode) => {


    });
});

const main = () => {
    http.listen(SERVER_PORT, () => {
        console.log(`Server is running on port`, SERVER_PORT);
    });
};

main();
