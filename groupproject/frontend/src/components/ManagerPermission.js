import React, { useState, lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useRole } from "../context/role";
import axios from 'axios';
import checkRole  from "./CheckManager";



// function axoisMethod(data, url) {
//     return axios({
//         method:'post',
//         url:url,
//         data:data
//     }).then( res => {
//         if (res.status === 200 && res.data.is_manager === true) {
//         // setRole('manager');
//         // setRole('manager');
//         alert('True');
//         return true;
//         alert(flag["flag"]);
//         // return true;
//         } else if (res.status === 200 && res.data.is_manager === false) {
//         // setRole('customer');
//         // return false;
//         } else {
//             // return false;
//         }
//     }).catch(e => {
//         alert('Hi');
//         // alert('Error!1');
//         // setIsError(true);
//     });
// };


// var ff = async function(){

//     // const { role } = useRole();
//     // console.log(token);
//     // alert(token);
//     // const url = ;
//     const data = {
//         "token": token
//       };
//     const url = 'http://localhost:8000/checkmanager/';
//     var flag = await axoisMethod(data, url);

//     return flag

    

//     }



function ManagerPermission({ component: Component, ...rest }) {
    // const [role, setRole] = useState();
    // const { authTokens } = useAuth();
    // checkRole(authTokens);
    const role = localStorage.getItem('role');



    // alert("after checkRole");
    // alert(role);
    // alert({role});
  
    return(

        <Route {...rest} render={(props) => 
            // role ? (
            role === 'manager' ? (
        <Component {...props} />
        ) : (
            <Redirect to={{pathname: "/signin/", state: { referer: props.location }}} />
          ) }
        />
    );
    }

export default ManagerPermission;