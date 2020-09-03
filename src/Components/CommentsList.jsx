import React, { Component } from 'react';
import Voter from "./Voter"
import CommentDeleter from './CommentDeleter';

class CommentsList extends Component {

    render() {
        const {comments, user, commentsChanged} = this.props
        return (
            <div className="App-Article_Comments">
                <h2>User Comments</h2>
                {comments.map((comment)=>{
                    return (
                        <section id={comment.comment_id} key={comment.comment_id} className="App-Article_Comment">
                            {/* <p>Comment ID: {comment.comment_id}</p> */}
                            <p>Author: {comment.author}</p>
                            <Voter id={comment.comment_id} type="comments" votes={comment.votes}/>
                            <p>Created at: {comment.created_at}</p>
                            <p>{comment.body}</p>
                            {(comment.author === user) && <CommentDeleter commentID={comment.comment_id} commentsChanged={commentsChanged}/>}
                        </section>
                    )
                })}
            </div>
        );
    }
    
}

export default CommentsList;
