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
const connection = false;

const { SERVER_PORT } = process.env;

io.on('connection', (socket) => {
    console.log(`Connection from ${socket}`)


    socket.on('createlobby', (lobbyCode) => {
        socket.join(lobbyCode);
        console.log(lobbyCode)
        const newLobby = new Lobby(io, lobbyCode);
        
        lobbies.push(newLobby);
        console.log(lobbies)

    });

    socket.on('userjoin', (user_id, lobbyCode) => {
        socket.join(lobbyCode)

        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.addUserToLobby(io, user_id, socket);

        console.log(lobbies)

    });

    socket.on('endcalls', (lobbyCode) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.endRooms();

    })

    socket.on('startapp', () => {

    })

    socket.on('choosename', (user_id, nickname) => {
        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.modifyNickname(user_id, socket);


    });

    socket.on('hostleave', () => {

    });

    socket.on('userleave', () => {

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
