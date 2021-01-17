const { createRoom } = require('./room.js')

class Lobby {
    constructor(io, lobbyCode) {
        this.io = io;
        this.lobbyCode = lobbyCode;
        this.duration;
        this.questions = []
        this.userInLobby = [];
        this.usersInWaitingArea = [];
        this.activeRooms = [];

        this.updateSocket = this.updateSocket.bind(this);

        this.setQuestions = this.setQuestions.bind(this);

        this.setDuration = this.setDuration.bind(this);
        this.getNumberOfUsers = this.getNumberOfUsers.bind(this);
        this.getLobbyCode = this.getLobbyCode.bind(this);
        this.modifyNickname = this.modifyNickname.bind(this);
        this.addUserToLobby = this.addUserToLobby.bind(this);
        this.isUserInLobby = this.isUserInLobby.bind(this);
        this.getUsersInLobby = this.getUsersInLobby.bind(this);
        this.endLobby = this.endLobby.bind(this);
    
        // All methods for rooms
        this.getRooms = this.getRooms.bind(this);
        this.createRooms = this.createRooms.bind(this);
        this.endRoom = this.endRoom.bind(this);
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getNumberOfUsers = () => {
        return this.userInLobby.length;
    }

    modifyNickname = (user_id, nickname) => {
        const user = this.userInLobby.find(element => (element.id === user_id));

        if (!user) {
            console.log("error, user does not exist");
        } else {
            user.nickname = nickname;
            this.usersInWaitingArea.push(user)
        }
    }

    endLobby = () => {
        this.io.to(this.lobbyCode).emit('endlobby');
    }

    getLobbyCode = () => {
        return this.lobbyCode;
    }

    updateSocket = (user_id, socket) => {
        const user = this.userInLobby.find(element => (element.id === user_id));

        user.socket = socket;
    }

    addUserToLobby = (io, user_id, socket) => {
        this.userInLobby.push({
            io: io,
            socket_id: socket.id,
            id: user_id,
            nickname: "default",
            usersAlreadyMatched: [],
            socket: socket
        });  
    };

    isUserInLobby = (user_id) => {
        return this.userInLobby.find((user) => user.id === user_id);
    }

    getUsersInLobby = () => {

        let nickUsers = [];
        for (let i = 0; i < this.userInLobby.length; i++) {

            if (this.userInLobby[i].nickname == 'default') {
                continue;
            }
            else {
                nickUsers.push(this.userInLobby[i].nickname);
            }
        }

        return nickUsers;
    }

    setQuestions = (questions) => {
        this.questions = questions;
    }
    
    createRooms = () => {
        let availableUsers = this.usersInWaitingArea;

        if (availableUsers.length <= 1){
            return;
        }
        
        while (availableUsers.length > 0) {
            if (availableUsers.length % 2 == 0){
                const randomAvailableUser = availableUsers[Math.floor(Math.random() * availableUsers.length)]
                availableUsers = availableUsers.filter((user) => user.id !== randomAvailableUser.id);
                const secondRandomAvailableUser = availableUsers[Math.floor(Math.random() * availableUsers.length)]
                availableUsers = availableUsers.filter((user) => user.id !== secondRandomAvailableUser.id);

                let matches = [randomAvailableUser, secondRandomAvailableUser];
                let roomString = `${randomAvailableUser.id}-${secondRandomAvailableUser.id}`;

                createRoom(this.io, matches, roomString)
                this.activeRooms.push(roomString)
            } else {
                const randomAvailableUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
                availableUsers = availableUsers.filter((user) => user.id !== randomAvailableUser.id);
                const secondRandomAvailableUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
                availableUsers = availableUsers.filter((user) => user.id !== secondRandomAvailableUser.id);
                const thirdRandomAvailableUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
                availableUsers = availableUsers.filter((user) => user.id !== thirdRandomAvailableUser.id);

                let matches = [randomAvailableUser, secondRandomAvailableUser, thirdRandomAvailableUser];
                let roomString = `${randomAvailableUser.id}-${secondRandomAvailableUser.id}`;

                createRoom(this.io, matches, roomString, this.endRoom, this.duration, this.questions)
                this.activeRooms.push(roomString)
            }
        }

    }

    userLeave = (user_id, lobbyCode) => {
        let index = this.usersInWaitingArea.findIndex(element => (element === this.usersInWaitingArea[i].user_id)); 
        this.userInLobby.splice(index, 1);
    }

    getRooms = () => {
        return this.activeRooms;
    }

    endRooms = () => {
        this.io.to(this.lobbyCode).emit('closerooms')
    }

    endRoom = (room) => {
        this.activeRooms = this.activeRooms.filter((activeRoom) => activeRoom != room);
    }

}

module.exports = Lobby;