const OpenTok = require('opentok');
const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env; 
const opentok = new OpenTok(OPENTOK_API_KEY, OPENTOK_API_SECRET);

const createRoom = (io, users, room, endRoom, duration, questions) => {
    let sessionId, token;
    let countdown;
    if (!duration){
        countdown = 300000;
    } else {
        countdown = duration;
    }
    

    const sendToUser = () => {
        users.forEach((user, index) => {
            if (users.length === 3) {
                // Array storing users that they already talked to, don't match again
                const otherUser = users.filter((otherUser) => otherUser.id == user.id)
                otherUser.map((otherUser) =>  user.usersAlreadyMatched.push(otherUser.user_id));
            
            } else {
                const otherUser = index ? users[0] : users[1];
                user.usersAlreadyMatched.push(otherUser.user_id);

            }

            // Subscribe to new room for 1-on-1 chat
            user.socket.join(sessionId);

            // Pass the session Id for the Vonage Video Conference to the client
            io.to(user.socket.id).emit('joinedroom', {
                sessionId: sessionId,
                token: token,
            });

            user.socket.on('ready', () => {
                io.to(room).emit('questions', questions);
            })

            const removeSocketListeners = () => {
                user.socket.off('sendChatMsg');
                user.socket.off('userLeave');
            }

            const userLeave = () => {
                removeSocketListeners()
                endRoom(room)
            }

            setInterval(() => {
                countdown--;
                io.to(room).emit('timer', countdown);

                if (countdown == 0){
                    clearInterval()
                    userLeave()
                }
            }, duration)

            const chat = (msg) => {
                console.log(msg)

                user.socket.to(sessionId).emit('receiveChatMsg', msg);
            }
            
            

            // Handle chat messages
            user.socket.on('sendChatMsg', chat)
            user.socket.on('userLeave', userLeave)
        
        })
    }

    // Create a video conference session with Vonage API for the two users
    opentok.createSession({mediaMode: "route"}, (error, session) => {
        if (error) {
            console.log(`Error creating session: ${error}`);
        } else {
            sessionId = session.sessionId;
            console.log(`Created Vonage Video session between ${users[0]} and ${users[1]} with session ${sessionId}`);

            token = session.generateToken({
                role: 'publisher',
            })

            sendToUser()
        }
    })

    return true;
}




module.exports = { createRoom };