import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

// var TOKEN = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9YTNkYTU0MjA3MzQ3NDlmN2RlMTJmODgyN2I2NmE5NTY0ZWJkZDYzMTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXhNRGd4TlRReE1qQTFOSDRyV1VaSFJqQjJWV1ozTDBsVmNVVllWSFkzTDNsaVZqUi1VSDQmY3JlYXRlX3RpbWU9MTYxMDgxNzg4OCZub25jZT0wLjcxNDQ3NzcxMTAxNjIzNDgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxMDkwNDI4OA==';

const VideoChat = ({API_KEY, SESSION_ID, TOKEN}) => {
    const [error, setError] = useState();

    const publisherEventHandlers = {
        streamCreated: event => {
          console.log('Publisher stream created!');
        },
        streamDestroyed: event => {
          console.log('Publisher stream destroyed!');
        }
    };

    const subscriberEventHandlers = {
        videoDisabled: event => {
          console.log('Subscriber video disabled!');
        },
        videoEnabled: event => {
          console.log('Subscriber video enabled!');
        }
    };

    return (
        <VideoChatBody>
            <VideoChatDiv>
                <OTSession
                apiKey={API_KEY}
                sessionId={SESSION_ID}
                token={TOKEN}
                onError={(err) => setError(err)}
                >
                    <VideoChatSub>
                    <OTStreams onError={(err) => setError(err)}>
                        <OTSubscriber
                        properties={{
                            width: '100vw',
                            height: '90vh', 
                         
                        }}
                        eventHandlers={subscriberEventHandlers}
                        onError={(err) => setError(err)}/>
                    </OTStreams>
                    </VideoChatSub>
                    <VideoChatPub>
                    <OTPublisher
                    eventHandlers={publisherEventHandlers}
                    properties={{
                        width: '100%',
                        height: '20vh',
                    }}/>
                    </VideoChatPub>
                    
                </OTSession>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </VideoChatDiv>
        </VideoChatBody>
    );
};

const ErrorMessage = styled.h1`

`;

const VideoChatBody = styled.div`
    height: 90vh;
`;

const VideoChatSub = styled.div`
    height: 90vh;
    width: 100%;
    position: relative;
`;

const VideoChatPub = styled.div`
    height: 20vh;
    width: 20vw;
    position: fixed;
    z-index: 10;
    bottom: 50px;
    right: 50px;
`;

const VideoChatDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    width: 100vw;
`;

export default VideoChat;
