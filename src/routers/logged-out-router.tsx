import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { NotFound } from "../pages/client/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  isLoggedInVar(false);
  return (
    <Router>
      <Switch>

        <Route path="/create-account">
          <CreateAccount />
        </Route>

        <Route path="/" exact>
          <Login />
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>
    </Router>
  );
};
