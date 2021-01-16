require('dotenv').config();
const express = require("express");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Lobby = require('./lobby.js');

const lobbies = [];
const connection = false;

const { SERVER_PORT } = process.env;

io.on('connection', (socket) => {
    connection = true;

    socket.on('createlobby', (lobbyCode) => {
        socket.join(lobbyCode);
        const newLobby = new Lobby(io, lobbyCode);
        
        lobbies.push(newLobby);
    });

    socket.on('userjoin', (user_id, lobbyCode) => {
        socket.join(lobbyCode)

        const LobbyToModify = lobbies.find((lobby) => lobby.getLobbyCode() === lobbyCode);
        LobbyToModify.addUserToLobby(user_id, socket);

    });

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
        connection = false;
    });
});

const main = () => {
    http.listen(SERVER_PORT, () => {
        console.log(`Server is running on port`, SERVER_PORT);
    });
};

main();
