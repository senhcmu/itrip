/*
 * Author: Lin Zhaozhi
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import axios from 'axios';

import Attractions from '../components/Attractions'
import Hotels from '../components/Hotels'
import Restaurants from '../components/Restaurants'

import Landscape from '../../../static/images/landscape.jpg';

const bgStyle = {
	height: screen.height,
	backgroundImage: `url(${Landscape})`,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	opacity: 0.9
};

const inputStyle = {
	width: 3 * screen.width / 10,
	marginTop: "200px",
	marginLeft: "300px",
	marginRight: "auto"
};

class HomeView extends Component {

	state = {
		Keyword: '',
		Attractions: [],
		Hotels: [],
		Restaurants: [],
		Transportations: [],
	}

	searchFor(destination) {
		console.log('User entered ' + destination);
		axios.get(urlAndPort+'api/get_attractions/?city=' + destination).then(res => {
			this.setState({
				Attractions: res.data.results.slice(0, 3)
			});
		});

		axios.get(urlAndPort+'api/get_restaurants/?city=' + destination).then(res => {
			this.setState({
				Restaurants: res.data.results.slice(0, 3)
			});
			console.log(this.state.Restaurants);
		});

		axios.get(urlAndPort+'api/get_hotels/?city=' + destination).then(res => {
			console.log(res.data.results);
			this.setState({
				Hotels: res.data.results.slice(0, 3)
			});
		});

	}

	render() {
		return (
			<Fragment>
				<div style={bgStyle}>
					<h2>Click On The Destination In The Navbar, Start Exploring!</h2>
				</div>
			</Fragment>
			
		)
	}
}

console.log('in HomeView!!!' + screen.height);



export default HomeView;
