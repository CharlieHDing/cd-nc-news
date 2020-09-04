import React, { Component } from 'react';
import * as api from "../utils/api";

class CommentAdder extends Component {
  
  state = {
      newComment: "",
      error: false
    };

  render = () => {
    const { newComment, error } = this.state;
    const { user } = this.props;

    return (
      <section className="App-AddComment">
        { user ?
        <>
          <form onSubmit={this.handleSubmit} >
            <input
              type="text"
              name=""
              id="newComment"
              placeholder="Add a comment..."
              onChange={this.handleChange}
              value={newComment}
            />
            <br/>
            <button className="App-AddComment_Button" >submit</button>
            <p className="submitError"> {error && "Please add a comment body before submitting..."}</p>
          </form>
        </>
        :
        <p>Login to add a comment</p>
        }
      </section>
    );
  };

  handleChange = (changeEvent) => {
    const { id, value } = changeEvent.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (submitEvent) => {
    const {newComment, error} = this.state
    const {articleID, user} = this.props
    submitEvent.preventDefault();
    if (newComment === ""){
      this.setState({error: !error})
    } else {
      api.postComment(articleID, user, newComment).then(() => {
        this.props.commentsChanged();
        this.setState({newComment: ""})
      })
    }
  };
}

export default CommentAdder;