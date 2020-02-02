

import React, { Component, Fragment } from 'react'
import { Input } from 'antd';
import axios from 'axios';

import HotAttractions from '../components/HotAttractions'

class HotAttractionsView extends Component {

	state = {
		Keyword: '',
		Attractions: []
	}

	componentDidMount() {
		// console.log('User entered ' + destination);
		
		axios.get(urlAndPort+'api/top_attractions/').then(res => {
			// console.log(res.data.results);
			this.setState({
				Attractions: res.data.results.slice(0, 5)
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
				<HotAttractions data={this.state.Attractions} />
				{/* <Restaurants data={this.state.Restaurants} /> */}
			</Fragment>
		)
	}
}




export default HotAttractionsView;
