import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';


// var API_KEY = '45828062';
// var SESSION_ID = '1_MX40NTgyODA2Mn5-MTYxMDgxNTQxMjA1NH4rWUZHRjB2VWZ3L0lVcUVYVHY3L3liVjR-UH4';
// var TOKEN = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9YTNkYTU0MjA3MzQ3NDlmN2RlMTJmODgyN2I2NmE5NTY0ZWJkZDYzMTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXhNRGd4TlRReE1qQTFOSDRyV1VaSFJqQjJWV1ozTDBsVmNVVllWSFkzTDNsaVZqUi1VSDQmY3JlYXRlX3RpbWU9MTYxMDgxNzg4OCZub25jZT0wLjcxNDQ3NzcxMTAxNjIzNDgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxMDkwNDI4OA==';

const VideoChat = ({API_KEY, SESSION_ID, TOKEN}) => {
    const [error, setError] = useState();
    

    const publisherEventHandlers = {
        streamCreated: event => {
          console.log('Publisher stream yay');
        },
        streamDestroyed: event => {
          console.log('Publisher stream boom');
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
                eventHandlers={publisherEventHandlers}>
                    <OTPublisher
                    properties={{
                        width: '100vw',
                        height: '100vh',
                    }}/>
                    <OTStreams onError={(err) => setError(err)}>
                        <OTSubscriber
                        properties={{
                            width: '100vw',
                            height: '100vh'
                        }}
                        eventHandlers={subscriberEventHandlers}
                        onError={(err) => setError(err)}/>
                    </OTStreams>
                </OTSession>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </VideoChatDiv>
        </VideoChatBody>
    );
};

const ErrorMessage = styled.h1`

`;

const VideoChatBody = styled.div`
    height: 100vh;
`;

const VideoChatDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 50vw;
`;

export default VideoChat;
