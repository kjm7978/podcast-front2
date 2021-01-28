import { useQuery } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Hosts } from "../pages/client/host";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Button } from "../components/button";
import { LS_TOKEN } from "../constants";

const ClientRoutes = () => [
  <>
    <Route path="/.." exact>
      <Hosts />
    </Route>
  </>
];
  

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  console.log(error)
  if(false ){
  //if(!data || loading || error){
    return(
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    )
  }
  return (
    <Router>
      <Header/>
      <Switch>
        {data?.me.role === "Listener"  && ClientRoutes}
        <Redirect to="/" />
      </Switch>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="grid gap-3 w-full max-w-xs" >
          <h1>Welcome podcast user : {data?.me.email}</h1>
          <h1>Your id is {data?.me.id}</h1>
          <h1>You are podcast's {data?.me.role}</h1>
          <Button  onClick={()=>{isLoggedInVar(false); authTokenVar("");localStorage.setItem(LS_TOKEN, "");;}} isValid={true} loading={loading} text="Log Out" />
        </div>
      </div>
    </Router>
  )
};
