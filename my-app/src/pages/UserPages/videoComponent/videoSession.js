const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env; 

let session, publisher, subcriber;




// export const initializaSession = () => {
//  session = OT.initSession(apiKey, sessionId);
//  // create a publisher
//  publisher = OT.initPublisher(
//     "publisher",
//     {
//        insertMode: "append",  
//        width: "100%",
//        height: "100%"
//     },
//     handleError
//  );
//  // subscribe to newly created stream
//  session.on("streamCreated", function (event) {
//      subscriber = session.subscribe(
//          event.stream,
//          "Subscriber",
//          {
//             insertMode: "append",
//             width: "100%",
//             height: "100%",
//          },
//          handleError
//     );
//  });

//  // connect to the session
//  session.connect(token, function (error) {
//    // If the connection is successful, publish to the session
//    if (error) {
//        handleError(error);
//    } else {
//        session.publish(publisher, handleError);
//    }
//  });
//  // do some action upon destroying the created stream
//  session.on("streamDestroyed", function (event) {
//      console.log("The Video chat has ended");
//  });
// }
