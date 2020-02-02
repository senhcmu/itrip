import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

function Loggedin({ component: Component, ...rest }) {
    const authTokens = localStorage.getItem("tokens");

    // if (authTokens){
    //     alert('Already logged in!');
    // }
    // alert(authTokens === "undefined");
  
    return(

        <Route {...rest} render={(props) => 
           ! authTokens ? (
        <Component {...props} />
        ) : (
            <Redirect to={{referer: props.location }} />
          ) }
        />
    );
    }

export default Loggedin;