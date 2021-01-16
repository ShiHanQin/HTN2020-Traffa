import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Landing, NameScreen, HostDashboard } from './pages/index.js';

function App() {
  return (
      <Router>
          <div>
            
                      


              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/nameScreen">
                      <NameScreen />
                  </Route>
                  <Route path="/hostDashboard">
                      <HostDashboard />
                  </Route>
                  <Route path="/"> {/*Keep the / path at the end*/}
                      <Landing />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
