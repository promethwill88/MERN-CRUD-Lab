import React, {Component} from 'react';
import $ from 'jquery-ajax';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
 // this uses seed data to test RENDER
import style from './style';

class CommentBox extends Component {
	constructor(props){
		super(props);
		this.state = {data:[]};
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
	    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
	    this.handleCommentDelete = this.handleCommentDelete.bind(this);
	}

	loadCommentsFromServer(){
	  $.ajax({
	    method: 'GET',
	    url: this.props.url
	  })
	  .then(res => {
	    this.setState({ data: res.comments });
	  })
	}

	handleCommentDelete(id) {
		$.ajax({
			method: 'DELETE',
			url: `${this.props.url}/${id}`
		})
		.then((res) => {
			console.log('Comment deleted');
		}, (err) => {
			console.log(err);
		});
	}

	handleCommentUpdate(id, comment) {
		$.ajax({
			method: 'put',
			url: `${this.props.url}/${id}`,
			data: comment
		})
		.then((res) => {
			console.log(res);
		}, (err) => {
			console.log(err);
		});
	}
	handleCommentSubmit(comment) {
		console.log('handleCommentSubmit is activated', comment);
		let comments = this.state.data;
		comment.id = Date.now();
		
		$.ajax({
			method: 'POST',
			url: this.props.url,
			data: comment
		})
		.then(res => {
			console.log("hello",res);
			let newComments = comments.concat([res]);
			this.setState({data: newComments});
			
		 }, err => {
	      console.error(err);
	      this.setState({ data: comments });
	    });
	  }

	componentDidMount() {
		console.log('Mounted');
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
	render() {
		return(
			<div style={ style.commentBox }>
		    	<h2 style={ style.title }>Comments:</h2>
			  <CommentList 
			  onCommentDelete={ this.handleCommentDelete }
			  onCommentUpdate={ this.handleCommentUpdate }
			  data={ this.state.data }/>
			   <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
			  </div>
		)
	}
}

export default CommentBox;