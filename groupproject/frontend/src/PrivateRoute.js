import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");;
  
    return(

        <Route {...rest} render={(props) => 
            isLoggedIn === 'true' ? (
        <Component {...props} />
        ) : (
            <Redirect to={{pathname: "/signin/", state: { referer: props.location } }} />
          ) }
        />
    );
    }

export default PrivateRoute;