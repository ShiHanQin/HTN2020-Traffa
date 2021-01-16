const createRoom = require('./room.js')

class Lobby {
    constructor(io, lobbyCode) {
        this.io = io;
        this.lobbyCode = lobbyCode;
        this.userInLobby = [];
        this.usersInWaitingArea = [];
        this.activeRooms = [];

        this.getNumberOfUsers = this.getNumberOfUsers.bind(this);
        this.getLobbyCode = this.getLobbyCode.bind(this);
        this.modifyNickname = this.modifyNickname.bind(this);
        this.addUserToLobby = this.addUserToLobby.bind(this);
        this.endLobby = this.endLobby.bind(this);
        this.createRooms = this.createRooms.bind(this);
        this.endRoom = this.endRoom.bind(this);
    }

    getNumberOfUsers = () => {
        return this.userInLobby.length;
    }

    modifyNickname = (user_id, nickname) => {
        const user = this.userInLobby.find(element => (element === user_id));

        if (!user) {
            console.log("error, user does not exist");
        } else {
            user.nickname = nickname;
        }
    }

    endLobby = () => {
        this.io.to(this.lobbyCode).emit('endlobby');
    }

    getLobbyCode = () => {
        return this.lobbyCode;
    }

    addUserToLobby = (io, user_id, socket) => {
        this.userInLobby.push({
            io: io,
            id: user_id,
            nickname: "",
            usersAlreadyMatched: [],
            socket: socket
        });  
    };
    
    createRooms = () => {
        for (i = 0; i < this.userInLobby.length; i++) {
            let matchStatus = this.usersInWaitingArea.find(element => (element === this.usersInWaitingArea[i].user_id)); 
            let matchStatusTwo = this.usersInWaitingArea.find(element => (element === this.usersInWaitingArea[i+1].user_id)); 
            if ((!matchStatus) && (!matchStatusTwo)) {
                i += 1;
                continue;
            }
            else if ((!matchStatus) && (matchStatusTwo)) {
                continue;      
            }
            else if ((matchStatus) && (!matchStatusTwo)) {
                let temp = this.userInLobby[i];
                this.userInLobby[i] = this.userInLobby[i+1];
                this.userInLobby[i+1] = temp;
                continue;
            }
            else if ((matchStatus) && (matchStatusTwo)) {
                let matches = [this.userInLobby[i], this.userInLobby[i+1]];
                let roomString = `${this.userInLobby[i].user_id}-${this.userInLobby[i+1].user_id}`;
                createRoom(this.io, matches, roomString);

                this.activeRooms.push(roomString);
            }
        }
    }

    userLeave = (user_id, lobbyCode) => {
        let index = this.usersInWaitingArea.findIndex(element => (element === this.usersInWaitingArea[i].user_id)); 
        this.userInLobby.splice(index, 1);
    }
    endRooms = () => {
        this.io.to(this.lobbyCode).emit('closerooms')
    }

    endRoom = (room) => {
        this.activeRooms = this.activeRooms.filter((activeRoom) => activeRoom != room);
    }

}

module.exports = Lobby;