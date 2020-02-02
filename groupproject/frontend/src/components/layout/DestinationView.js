/*
 * Author: Lin Zhaozhi
 */

import React, { Component, Fragment } from 'react'
import { Input } from 'antd';
import axios from 'axios';

import Attractions from '../components/Attractions'
import Hotels from '../components/Hotels'
import Restaurants from '../components/Restaurants'

class DestinationView extends Component {

	state = {
		Keyword: '',
		Attractions: [],
		Hotels: [],
		Restaurants: [],
		Transportations: [],
	}

	searchFor(destination) {
		console.log('You entered ' + destination);
		
		var restaurants = [];
		var hotels = [];
		var attractions = [];
		
		axios.get(urlAndPort+'api/get_attractions/?city=' + destination).then(res => {
		 
		 attractions = res.data.results.slice(0, 3);
		 axios.get(urlAndPort+'api/get_restaurants/?city=' + destination).then(res => {
		  
		  restaurants = res.data.results.slice(0, 3);
		  axios.get(urlAndPort+'api/get_hotels/?city=' + destination).then(res => {
		   console.log(res.data.results);
		   hotels = res.data.results.slice(0, 3);
		   
		   
		   this.setState({
			Hotels: hotels,
			Restaurants: restaurants,
			Attractions: attractions
		   })
		   
		  });
		  
		 });
		 
		});
	}
	render() {
		/* return (
			<SearchBar
				placeholder="Search"
				onChangeText={query => { this.setState({ Keyword: query }); }}
				value={this.state.Keyword}
			/>
		); */
		return (
			<Fragment>
				<Input.Search 
				placeholder="Enter a city name" 
				onSearch={ key => this.searchFor(key) } 
				style={{ width: 200}} 
				enterButton />
				<Attractions data={this.state.Attractions} />
				<Hotels data={this.state.Hotels} />
				<Restaurants data={this.state.Restaurants} />
			</Fragment>
		)
	}
}

console.log('in DestinationView!!!');



export default DestinationView;
