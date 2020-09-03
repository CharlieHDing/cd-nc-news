import React, { Component } from "react";
import * as api from "../utils/api";

class CommentDeleter extends Component {
  state = {
    commentsToDelete: [],
  };

  handleSubmit = (submitEvent) => {
    const { commentID } = this.props;
    submitEvent.preventDefault();
    return api.deleteComment(commentID).then((comment) => {
      this.props.deleteComment(comment);
    });
  };

  render() {
    return (
      // <>
      //     <button onClick={this.removeComment} >Delete Comment</button>
      // </>

        <form onSubmit={this.handleSubmit} className="DeleteComment">
              <button>Delete comment</button>
        </form>
    );
  }
}

export default CommentDeleter;