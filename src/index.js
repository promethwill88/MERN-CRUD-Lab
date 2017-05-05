import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

//more React code here!
ReactDOM.render(
  <CommentBox
    url='https://mern-comment-box-api.herokuapp.com/comments' pollInterval={2000} />,
  document.getElementById('root')
);
