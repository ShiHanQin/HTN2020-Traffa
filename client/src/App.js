import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/user.js";
import { Landing, RoomInterface, NameScreen, CreationDashboard, JoiningLobby, Lobby } from './pages/index.js';
import { useSessionStorage } from "./utils/index.js";

import GlobalStyle from './globalStyles'

function App() {
  const [name, setName] = useSessionStorage("name", "");
  const [id, setId] = useSessionStorage("userId", "");
  const [room, setRoom] = useSessionStorage("roomCode", "");  
  const [sessionId, setSessionId] = useSessionStorage("sessionId", "");
  const [token, setToken] = useSessionStorage("token", "")



  return (
    <UserContext.Provider value={{
        name: {value: name, setValue: setName},
        userId: {value: id, setValue: setId},
        roomCode: {value: room, setValue: setRoom},
        sessionId: {value: sessionId, setValue: setSessionId},
        token: {value: token, setValue: setToken}
      }}>
      <GlobalStyle />
      <Router>
          <div>
          

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/lobby/:code">
                      <Lobby />
                </Route>
                  <Route path="/nameScreen/:code">
                      <NameScreen />
                  </Route>
                  <Route path="/creationDashboard">
                      <CreationDashboard />
                  </Route>
                  <Route path="/room">
                      <RoomInterface />
                  </Route>                  
                  <Route exact path="/"> {/*Keep the / path at the end*/}
                      <Landing />
                  </Route>
                  <Route path="/test">
                      <JoiningLobby />
                  </Route>
                  <Route>
                       <div><h1>u got lost buddy</h1></div>
                  </Route>
              </Switch>
          </div>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
