import React, { Component } from 'react';
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentAdder from "./CommentAdder"
import FilterBar from './FilterBar';
import Voter from "./Voter"
import CommentDeleter from './CommentDeleter';

class CommentsList extends Component {

    state = {
        CommentChangeToggle: true,
        comments: [],
        sort_by: "votes", 
        order: "desc",
        err: null,
        isLoading: true
    }

    componentDidMount(){
        const { sort_by, order } = this.state;
        const { articleID } = this.props;
        this.getComments(articleID, sort_by, order )    
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { sort_by, order, CommentChangeToggle} = this.state
        const { articleID, showComments} = this.props;
        if (prevProps.showComments !== showComments || prevState.sort_by !== sort_by || prevState.order !== order || prevState.CommentChangeToggle !== CommentChangeToggle) {
            this.getComments(articleID, sort_by, order)
            this.setState({ isLoading: true });
        }
    }

    render() {
        const {articleID, user} = this.props
        const {comments, isLoading} = this.state
        if (isLoading) return <Loader />;
        return (
            <div className="App-Article_Comments">
                <h2>Comments</h2>
                <CommentAdder articleID={articleID} user={user} commentsChanged={this.commentsChanged}/>
                {FilterBar(this.setSortBy, this.setOrder, {votes:"number of votes", created_at: "time created"}, {desc: "descending", asc: "ascending"})}
                {comments.map((comment)=>{
                    const date = new Date(comment.created_at).toLocaleDateString();
                    return (
                        <section id={comment.comment_id} key={comment.comment_id} className="App-Article_Comment">
                            {/* <p>Comment ID: {comment.comment_id}</p> */}
                            <p>Author: {comment.author}</p>
                            <Voter id={comment.comment_id} type="comments" votes={comment.votes}/>
                            <p>Created at: {date}</p>
                            <p>{comment.body}</p>
                            {(comment.author === user) && <CommentDeleter commentID={comment.comment_id} commentsChanged={this.commentsChanged}/>}
                        </section>
                    )
                })}
            </div>
        );
    }
    
    getComments = (articleID, sort_by, order) => {
        api.fetchCommentsByArticleID(articleID, sort_by, order).then((comments) => {
          this.setState({ comments, isLoading: false });
        });
      };

    commentsChanged = () => {
        this.setState((currentState) => {
            return {
            CommentChangeToggle: !currentState.CommentChangeToggle
            };
        });
    };

    setSortBy = (clickEvent) => {
      const sort_by = clickEvent.target.id
      this.setState({ sort_by, isLoading: false })
    }

    setOrder = (clickEvent) => {
      const order = clickEvent.target.id
      this.setState({ order, isLoading: false })
    }
    
}

export default CommentsList;
