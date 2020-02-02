import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostListView from './layout/PostListView';
import PostView from './layout/PostView';
import SignInView from './layout/SignInView';
import SignUpView from './layout/SignUpView';
import DestinationView from './layout/DestinationView';
import PlannerView from './layout/PlannerView';
import AutoplannerFormView from './layout/AutoplannerFormView';
import HotHotelsView from './layout/HotHotelsView';
import HotAttractionsView from './layout/HotAttractionsView';
import HotRestaurantsView from './layout/HotRestaurantsView';
import PrivateRoute from '../PrivateRoute';
import Loggedin from '../Loggedin';
import ManagerGenerationView from './layout/ManagerGenerationView';
import ManagerPermission from './ManagerPermission';
import ProfileView from './layout/ProfileView';
import HomeView from './layout/HomeView';
import CreatePostView from './layout/CreatePostView';
import UpdatePostView from './layout/UpdatePostView';
// import { Switch } from 'react-router-dom';
const BaseRouter = () => (
	<div>
		<Switch>
		<Loggedin exact path='/signin/' component={SignInView} />
		<Loggedin exact path='/signup/' component={SignUpView} />
		<PrivateRoute exact path='/posts/' component={PostListView} />
		<Route exact path='/community/' component={PostListView} />
		<Route exact path='/destinations/' component={DestinationView} />
		<Route exact path='/post/:postId/' component={PostView} />
		<Route exact path='/hothotels/' component={HotHotelsView} />
		<Route exact path='/hotrestaurants/' component={HotRestaurantsView} />
		<Route exact path='/hotattractions/' component={HotAttractionsView} />
		<Route exact path='/autoplanner/' component={AutoplannerFormView} />
		<Route exact path='/autoplanner/detail' component={PlannerView} />
		<Route exact path='/profile/:ownername/' component={ProfileView} />
		<ManagerPermission exact path='/manager/' component={ManagerGenerationView} />
		<Route exact path="/createpost/" component={CreatePostView} />
		<Route exact path="/updatepost/" component={UpdatePostView} />
		
		<Route exact path='/' component={HomeView} />
	</Switch>

	</div>
	);

console.log('in router!');
export default BaseRouter;


