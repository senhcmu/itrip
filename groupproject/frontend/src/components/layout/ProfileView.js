/*
 * Author: Lin Zhaozhi
 */

import React, { Component, Fragment } from 'react'
import { Input, Form, Button, Card, Icon, Avatar } from 'antd';
import axios from 'axios';

import Attractions from '../components/Attractions'
import Hotels from '../components/Hotels'
import Restaurants from '../components/Restaurants'
import Posts from '../components/Posts';
import Followers from '../components/Followers';
import Following from '../components/Following';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'du0lyoxs';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djyhwcsgz/upload';

class ProfileView extends Component {

	state = {
		username: "",
		profileUsername:"",
		token: "",
		alreadyFollowed: false,
		posts: [],
		follower: [],
		following: []
	}

	constructor(props) {
		
		super(props);
		
		this.state.token = JSON.parse(localStorage.getItem("tokens"));
		// alert(localStorage)
		alert(localStorage.getItem("tokens"))
		// this.state.username = this.props.location.state.username;
		this.state.username = localStorage.getItem("username");
		//this.state.profileUsername = this.props.location.state.profileUsername;
		this.state.profileUsername = this.props.match.params.ownername;
		localStorage.setItem("profileUsername", this.state.profileUsername);
		alert(localStorage.getItem("username"))
        this.state.alreadyFollowed = false;
	}

	componentDidMount() {
		console.log("username:",this.state.username);
		console.log("token:",this.state.token);

        
		axios({
			method: "get",
			url: urlAndPort+"api/pro/?token="+this.state.token+"&username="+this.state.profileUsername,
		}).then(res => {
			this.setState({
                // profileUsername: res.data["username"],
				alreadyFollowed: res.data["is_following"],
				// posts: res.data.posts,
			});
        });


        axios.get(urlAndPort+'searchpostbyuser/?username='+this.state.profileUsername).then( res => {
            this.setState({
              Posts: res.data.results
            });
            // console.log(res.data.results);
		  });
		  axios.get(urlAndPort+'follower/?username='+this.state.profileUsername).then( res => {
            this.setState({
              follower: res.data.results
            });
		  });
		//   axios.get(urlAndPort+'following/?username='+this.state.profileUsername).then( res => {
        //     this.setState({
        //       Posts: res.data.results
        //     });
        //     // console.log(res.data.results);
        //   });

	}

	onImageDrop(files){
		this.handleImageUpload(files[0]);
	
	  }
	 
	handleImageUpload(file) {
		alert(file);
		console.log(file);
	
	
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
							.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
							.field('file', file);
	
		upload.end((err, response) => {
		  if (err) {
			console.error(err);
		  }
	
		  if (response.body.secure_url !== '') {
			setPhotoURL(response.body.secure_url);
			// this.setState({
			//   uploadedFileCloudinaryUrl: response.body.secure_url
			// });
		  }
		});
	  }



	handleFollow(event) {
		// alert(this.state.username);
		if (this.state.alreadyFollowed) {
			axios({
				method: "put",
				url: urlAndPort+"api/unfollow/",
				data: {
					"token": this.state.token,
					"username": this.state.profileUsername,
				}
			}).then(res => {
				if (res.data["is_success"]) {
					this.setState({
                        alreadyFollowed: res.data["is_following"],
                        //username: res.data["username"],
					});
				}
			});
		} else {
			axios({
				method: "put",
				url: urlAndPort+"api/follow/",
				data: {
					"token": this.state.token,
					"username": this.state.profileUsername,
				}
			}).then(res => {
				if (res.data["is_success"]) {
					this.setState({
						alreadyFollowed: res.data["is_following"],
					});
				}
			});
		}
		window.location.reload("#followers");
		window.location.reload("#followings");
	};

	render() {
		if (this.state.alreadyFollowed === true) {
			return (
				<Fragment>
					<Card
						style={{ width: 8 * screen.width / 10 }}
						cover={
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
								style={{ height: screen.height / 10 }}
							/>
						}
						actions={[
							<Button type="primary" onClick={event => this.handleFollow(event)}>Unfollow</Button>,
						]}
					>
						<Card.Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={this.state.profileUsername}
							description="This user is lazy that he/she does not put anything here"
						/>
					</Card>
					
					<Posts data={this.state.Posts} />
					<Followers data={this.state.follower} />
					<Following data={this.state.following} />
				</Fragment>
			);
		} else if (this.state.alreadyFollowed === "self"){
			return (
				<Fragment>
					<Card
						style={{ width: 8 * screen.width / 10 }}
						cover={
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
								style={{ height: screen.height / 10 }}
							/>
						}
					>

						<Card.Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={this.state.profileUsername}
							description="This user is lazy that he/she does not put anything here"
						/>



					</Card>
					
					<Posts data={this.state.Posts} />
					<Followers data={this.state.follower} />
					<Following data={this.state.following} />
				</Fragment>
			)


		} else { 
		return (
			<Fragment>
				<Card
					style={{ width: 8 * screen.width / 10 }}
					cover={
						<img
							alt="example"
							src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							style={{ height: screen.height / 10 }}
						/>
					}
					actions={[
						<Button type="primary" onClick={event => this.handleFollow(event)}>Follow</Button>,
					]}
				>
					<Card.Meta
						avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						title={this.state.profileUsername}
						description="This user is lazy that he/she does not put anything here"
					/>
				
				</Card>
				
                <Posts data={this.state.Posts} />
				<Followers data={this.state.follower} />
				<Following data={this.state.following} />
			</Fragment>
		);
				}
	}
}

console.log('in DestinationView!!!');



export default ProfileView;
