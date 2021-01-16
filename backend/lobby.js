const createRoom = require('./room.js')

class Lobby {
    constructor(io, lobbyCode) {
        this.io = io;
        this.lobbyCode = lobbyCode;
        this.userInLobby = [];
        this.activeRooms = [];

        this.getLobbyCode = this.getLobbyCode.bind(this);
        this.modifyNickname = this.modifyNickname.bind(this);
        this.addUserToLobby = this.addUserToLobby.bind(this);
        this.endLobby = this.endLobby.bind(this);
        this.createRooms = this.createRoom.bind(this);
        this.endRoom = this.endRoom.bind(this);
        
    }

    modifyNickname = (user_id, nickname) => {
        let index = this.userInLobby.find(element => (element === user_id));

        if (typeof nickname !== 'undefined') {
            console.log("error, user does not exist");
        }
        
        else {
            this.userInLobby[index].nickname = nickname;
        }
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
            let matchStatus = this.usersAlreadyMatched.find(element => (element === this.userInLobby[i].user_id)); 
            let matchStatusTwo = this.usersAlreadyMatched.find(element => (element === this.userInLobby[i+1].user_id)); 
            if ((matchStatus) && (matchStatusTwo)) {
                i += 1;
                continue;
            }
            else if ((matchStatus) && (!matchStatusTwo)) {
                continue;      
            }
            else if ((!matchStatus) && (matchStatusTwo)) {
                let temp = this.userInLobby[i];
                this.userInLobby[i] = this.userInLobby[i+1];
                this.userInLobby[i+1] = temp;
                continue;
            }
            else if ((!matchStatus) && (!matchStatusTwo)) {
                let matches = [this.userInLobby[i], this.userInLobby[i+1]];
                let roomString = String(this.userInLobby[i].user_id) + String(this.userInLobby[i+1].user_id);
                createRoom(this.io, matches, roomString);

                this.activeRooms.push(roomString);
            }
        }
    }

    endRooms = () => {
        this.userInLobby.forEach((user) => {
            io.to(user.socket.id).emit('end')
        })
    }

    endRoom = (room) => {
        this.activeRooms = this.activeRooms.filter((activeRoom) => activeRoom != room);
    }

}

module.exports = Lobby;