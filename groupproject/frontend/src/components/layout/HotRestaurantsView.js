

import React, { Component, Fragment } from 'react'
import { Input } from 'antd';
import axios from 'axios';

import HotRestaurants from '../components/HotRestaurants'

class HotRestaurantsView extends Component {

	state = {
		Keyword: '',
		Restaurants: []
	}

	componentDidMount() {
		// console.log('User entered ' + destination);
		
		axios.get(urlAndPort+'api/top_restaurants/').then(res => {
			console.log(res.data.results);
			this.setState({
				Restaurants: res.data.results.slice(0, 5)
			});
		});


	}

	render() {

		return (
			<Fragment>
				{/* <Input.Search 
				placeholder="Enter a city name" 
				onSearch={ key => this.searchFor(key) } 
				style={{ width: 200}} 
				enterButton /> */}
				{/* <Attractions data={this.state.Attractions} /> */}
				{/* <HotHotels data={this.state.Res} /> */}
				<HotRestaurants data={this.state.Restaurants} />
			</Fragment>
		)
	}
}




export default HotRestaurantsView;
