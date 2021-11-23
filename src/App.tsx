import SignInDashboard from "./dashboard/signin/SignInDashboard";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CLIENTS, DASHBOARD_SIGNIN, ROLES, PERMISSONS, USERS } from "./Routes";
import SideBar from "./components/SideBar";
import NavigationBar from "./components/NavigationBar";
import Permissions from "./dashboard/permissions/Permissions";
import Clients from "./dashboard/clients/Clients"
import Users from "./dashboard/users/Users";
import Roles from "./dashboard/roles/Roles";


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
              <Route path={CLIENTS}>
                <SideBar/>
                <NavigationBar/>
                <Clients/>
              </Route>
              <Route path={USERS}>
                <SideBar/>
                <NavigationBar/>
                <Users></Users>
              </Route>
              <Route path={ROLES}>
                <SideBar/>
                <NavigationBar/>
                <Roles/>
              </Route>
              <Route path={PERMISSONS}>
                <SideBar/>
                <NavigationBar/>
                <Permissions></Permissions>
              </Route>
              <Route path="/">
                <Redirect to={CLIENTS}/>;
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

export default App;
