// import { createContext, useContext } from 'react';
import React, { useState } from 'react';
import { useRole } from "../context/role";

import axios from 'axios';

// export const AuthContext = createContext();





function checkRole(token) {
    // alert('here!');

    // const [ role, setRole ] = useState();
    // const { setRole } = useRole();    
    // const { role } = useRole();
    // console.log(token);
    // alert(token);
    // const url = ;
    const data = {
        "token": token
      };
    const url = urlAndPort+'checkmanager/';

    axios({
        method:'post',
        url:url,
        data:data
    }).then( res => {
        // alert('before enter!');
        if (res.status === 200 && res.data.is_manager === true) {
            alert('success!');
            // alert('eneter!');
            localStorage.setItem('role','manager');
            // setRole('manager');

        } else if (res.status === 200 && res.data.is_manager === false) {
        } else {
        }
    }).catch(e => {
        alert('error!');

    });

}

export default checkRole;