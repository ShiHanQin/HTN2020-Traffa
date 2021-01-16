import { useEffect, useState } from "react"

const JoiningLobby = () => {

    const [participantCount, setParticipantCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Hey buddy, get clapped noob');
            //check new number of participants
            setParticipantCount(participantCount);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>
                peep console
            </h1>
            <h1>
                {participantCount} have joined ...
            </h1>
        </div>
    )
}

export default JoiningLobby;