import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import BaseRouter from './routes';
import ReactDOM from 'react-dom';
import Header from './layout/Header';
import BigTitile from './layout/BigTitile';
import 'antd/dist/antd.css';
import BasicLayout from './layout/BasicLayout';
import { AuthContext } from "../context/auth";

import { RoleContext } from "../context/role";

function APP () {	


const [authTokens, setAuthTokens] = useState();
const [role, setRole] = useState();
console.log("i dont know");
console.log(authTokens);

const setTokens = (data) => {
	console.log("enter setToekn!");
	console.log(data);
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


const setRoles = (data) => {
	// console.log("enter setToekn!");
	// console.log(data);
    localStorage.setItem("role", JSON.stringify(data));
    setRole(data);
  }
		return(
			<div className='APP'>
				<RoleContext.Provider value={{ role, setRole: setRoles }}>
				<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
					<Router>
						<Switch>
							<BasicLayout>
								<BaseRouter />
							</BasicLayout>
						</Switch>
					</Router>
				</AuthContext.Provider>
				</RoleContext.Provider>
			</div>

			);

	}

ReactDOM.render(<APP />, document.getElementById('app'));