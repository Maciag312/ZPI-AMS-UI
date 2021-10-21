import React from "react";
import SignInDashboard from "./dashboard/signin/SignInDashboard";
import Dashboard from "./dashboard/Dashboard";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { DASHBOARD_SIGNIN } from "./Routes";

function App() {
  return (
    <Box className="AppWrapper">
      <Box className="App">
        <ChakraProvider>
          <Router>
            <Switch>
              <Route path={DASHBOARD_SIGNIN}>
                <SignInDashboard></SignInDashboard>
              </Route>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

export default App;
