import { Helmet } from 'react-helmet';
import { ApolloClient, InMemoryCache, makeVar, createHttpLink  } from "@apollo/client";
import { LS_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";

const token = localStorage.getItem(LS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: "https://nuber-eats-challenge.herokuapp.com/graphql",  
})

const authLink = setContext((_,{headers})=>{
  return {
    headers:{
      ...headers,
      "x-jwt" : authTokenVar() || "",
    }
  }
})
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          },
          token: {
            read() {
              return authTokenVar();
            }
          }
        }
      }
    }
  })
});
