import React, { Component } from "react";
import * as api from "../utils/api";

class CommentDeleter extends Component {

  render() {
    return (
      <section className="App-Comments_DeleteComment">
        <button onClick={this.handleSubmit} >delete comment</button>
      </section> 
    );
  }

  handleSubmit = (submitEvent) => {
    const { commentID, commentsChanged} = this.props;
    submitEvent.preventDefault();
    return api.deleteComment(commentID).then(() => {
      commentsChanged();
    });
  };

}

export default CommentDeleter;