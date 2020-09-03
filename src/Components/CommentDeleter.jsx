import React, { Component } from "react";
import * as api from "../utils/api";

class CommentDeleter extends Component {

  handleSubmit = (submitEvent) => {
    const { commentID, commentsChanged} = this.props;
    submitEvent.preventDefault();
    return api.deleteComment(commentID).then(() => {
      commentsChanged();
    });
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="DeleteComment">
              <button>Delete comment</button>
        </form>
    );
  }
}

export default CommentDeleter;