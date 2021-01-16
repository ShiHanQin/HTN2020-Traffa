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
    // End all in-progress rooms and return all users to the waiting area
    socket.on('endcalls', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.endRooms();

    })

    // Create lobby with unique code so that other users can join
    socket.on('createlobby', (lobbyCode) => {
        socket.join(lobbyCode);
        const newLobby = new Lobby(io, lobbyCode);
        
        lobbies.push(newLobby);
    });

    // Pair all users in lobby and start networking
    socket.on('startapp', () => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.createRooms();
    })

    socket.on('hostleave', () => {

    });


    /* GLOBAL ACTIONS */
    // Provide information about number of users that are connected for the given lobby
    socket.on('usersconnected', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        const numOfUsers = LobbyToModify.getNumberOfUsers();

        socket.emit('numofusers', numOfUsers);
    })

    // Add user to lobby that was specified
    socket.on('userjoin', (user_id, lobbyCode) => {
        socket.join(lobbyCode)

        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.addUserToLobby(io, user_id, socket);

    });

    // Allow user to change nickname stored
    socket.on('choosename', (user_id, nickname) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.modifyNickname(user_id, nickname);

    });


    socket.on('userleave', () => {

    });
    
    socket.on('disconnect', (lobbyCode) => {
        connection = false;
    });
});

const main = () => {
    http.listen(SERVER_PORT, () => {
        console.log(`Server is running on port`, SERVER_PORT);
    });
};

main();
