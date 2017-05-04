import React, {Component} from 'react';
import $ from 'jquery-ajax';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from '../data';  // this uses seed data to test RENDER
import style from './style';

class CommentBox extends Component {
	constructor(props){
		super(props);
		this.state = {data:[]};
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}
	loadCommentsFromServer() {
		$.ajax({
			method: 'GET',
			url: this.props.url
		})
		.then((res) => {
			this.setState({ data: res });
		}, (err) => {
			console.log('error', err)
		})
	}
	handleCommentSubmit(comment) {
		console.log('handleCommentSubmit is activated', comment);
		let comments = this.state.data;
		comment.id = Date.now();
		let newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			method: 'POST',
			url: this.props.url,
			data: comment
		})
		.then(res => {
			console.log(res);
			
		}, err => {
			console.error(err)
			this.setState({ data: comments });
		});
	}
	commentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
	render() {
		return(
			<div style={ style.commentBox }>
		    	<h2>Comments:</h2>
			  <CommentList data={ this.state.data }/>
			   <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
			  </div>
		)
	}
}

export default CommentBox;