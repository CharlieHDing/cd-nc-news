import React, { Component } from 'react';
import * as api from "../utils/api";

class CommentAdder extends Component {
    state = {
        newComment: ""
      };
      render = () => {
        const { newComment } = this.state;

        return (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name=""
              id="newComment"
              onChange={this.handleChange}
              value={newComment}
            />
            <button>Add Comment</button>
          </form>
        );
      };
    
      handleChange = (changeEvent) => {
        const { id, value } = changeEvent.target;
        this.setState({ [id]: value });
      };
    
      handleSubmit = (submitEvent) => {
        const {newComment} = this.state
        const {ID, user} = this.props
        submitEvent.preventDefault();
        api.postComment(ID, user, newComment)
        this.setState({newComment: ""})
      };
    }

export default CommentAdder;