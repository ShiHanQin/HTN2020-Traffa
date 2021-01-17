import { useEffect } from 'react';

const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env; 

const OT = require('@opentok/client');

let session, publisher, subscriber;

var API_KEY = '45828062';
var SESSION_ID = '1_MX40NTgyODA2Mn5-MTYxMDgxNTQxMjA1NH4rWUZHRjB2VWZ3L0lVcUVYVHY3L3liVjR-UH4';
var TOKEN = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9YTNkYTU0MjA3MzQ3NDlmN2RlMTJmODgyN2I2NmE5NTY0ZWJkZDYzMTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXhNRGd4TlRReE1qQTFOSDRyV1VaSFJqQjJWV1ozTDBsVmNVVllWSFkzTDNsaVZqUi1VSDQmY3JlYXRlX3RpbWU9MTYxMDgxNzg4OCZub25jZT0wLjcxNDQ3NzcxMTAxNjIzNDgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxMDkwNDI4OA==';


const handleError = (error) => {
  if (error) {
    alert(error.message);
  }
}

export const initializeSession = (sessionId = SESSION_ID, token = TOKEN) => {
    console.log('grief');
    // check system requirements
    if (OT.checkSystemRequirements() == 1) {
        session = OT.initSession(API_KEY, sessionId);
    } else {
        // The client does not support WebRTC.
        // You can display your own message.
        console.log("Does not support WebRTC");
    }

    // create a publisher
    publisher = OT.initPublisher(
        "publisher",
        {
            insertMode: "append",
            width: "100%",
            height: "100%",
        },
        handleError
    );

    // subscribe to new stream
    session.connect(token, (error) => {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });


    session.on('streamCreated', (event) => {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: "append",
            width: '100%',
            height: '100%'
        }, handleError);
    });


}

