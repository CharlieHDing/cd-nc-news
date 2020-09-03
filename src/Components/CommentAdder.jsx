import React, { Component } from 'react';
import * as api from "../utils/api";

class CommentAdder extends Component {
  state = {
      newComment: ""
    };

  render = () => {
    const { newComment } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="App-AddComment">
        <h2>Add Comment</h2>
        <input
          type="text"
          name=""
          id="newComment"
          onChange={this.handleChange}
          value={newComment}
        />
        <br/>
        <button className="App-AddComment_Button" >Submit</button>
      </form>
    );
  };

  handleChange = (changeEvent) => {
    const { id, value } = changeEvent.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (submitEvent) => {
    const {newComment} = this.state
    const {articleID, user} = this.props
    submitEvent.preventDefault();
    if (newComment === ""){
      window.alert("Please add a post body")
    } else {
      api.postComment(articleID, user, newComment).then(() => {
        this.props.commentsChanged();
      })
      this.setState({newComment: ""})
    }
  };
}

export default CommentAdder;