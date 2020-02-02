

import React, { Component, Fragment } from 'react'
import { Input } from 'antd';
import axios from 'axios';

import HotHotels from '../components/HotHotels'

class HotHotelsView extends Component {

	state = {
		Keyword: '',
		Hotels: []
	}

	componentDidMount() {
		// console.log('User entered ' + destination);
		
		axios.get(urlAndPort+'api/top_hotels/').then(res => {
			console.log(res.data.results);
			this.setState({
				Hotels: res.data.results.slice(0, 5)
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
				<HotHotels data={this.state.Hotels} />
				{/* <Restaurants data={this.state.Restaurants} /> */}
			</Fragment>
		)
	}
}




export default HotHotelsView;
