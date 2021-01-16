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

    addUserToLobby = (user_id, socket) => {
        this.userInLobby.push({
            id: user_id,
            nickname: "",
            usersAlreadyMatched: [],
            socket: socket
        });  
    };
    
    createRooms = () => {
        for (i = 0; i < this.userInLobby.length; i+2) {
            this.usersAlreadyMatched.find(element => (element === this.userInLobby[i].user_id));
            this.activeRooms.push({
                createRoom(placeholder, [this.userInLobby[i], this.userInLobby])
            })
        }

    }


    
    


}

module.exports = Lobby;