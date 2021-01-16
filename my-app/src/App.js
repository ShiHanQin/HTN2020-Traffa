import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Landing, NameScreen, CreationDashboard, JoiningLobby } from './pages/index.js';

function App() {
  return (
      <Router>
          <div>
            
                      


              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/nameScreen/:code">
                      <NameScreen />
                  </Route>
                  <Route path="/creationDashboard">
                      <CreationDashboard />
                  </Route>
                  <Route exact path="/"> {/*Keep the / path at the end*/}
                      <Landing />
                  </Route>
                  <Route path="/test">
                      <JoiningLobby />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
