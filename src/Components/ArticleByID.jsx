import React, { Component } from 'react';

import * as api from "../utils/api";
import Loader from "./Loader";
import Article from "./Article"
import CommentsList from "./CommentsList"
import CommentAdder from "./CommentAdder"
import FilterBar from './FilterBar';

class ArticleByID extends Component {

    state = {
        article: [],
        isLoading: true,
        showComments: false,
        delCommentToggle: true,
        comments: [],
        sort_by: "votes", 
        order: "desc"
    }

    componentDidMount(){
        const { articleID } = this.props;
        this.getArticleByID(articleID)
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {showComments, sort_by, order, delCommentToggle} = this.state
        const { articleID } = this.props;
        if (prevState.showComments !== showComments || prevState.sort_by !== sort_by || prevState.order !== order || prevState.delCommentToggle !== delCommentToggle) {
            this.getComments(articleID, sort_by, order)
            this.setState({ isLoading: true });
        }
        if (prevProps.articleID !== articleID) {
            this.getArticleByID(articleID);
            this.setState({ isLoading: true });
        }
    }
    
    render() {
        const { article, isLoading, showComments, comments } = this.state
        const {user} = this.props
        if (isLoading) return <Loader />;
        return (
            <section>
                {Article(article)}
                <CommentAdder articleID={this.props.articleID} user={user}/>
                <button onClick={this.showComments}>Show Comments</button>
                <section>
                    {(showComments) && 
                    <>
                        {FilterBar(this.setSortBy, this.setOrder, ["votes", "created_at"], ["desc", "asc"])}
                        <CommentsList comments={comments} user={user} deleteComment={this.deleteComment}/>
                    </>
                    }
                </section>
            </section>
        );
    }

    getArticleByID = (articleID) => {
        api.fetchArticleByID(articleID).then((article) => {
          this.setState({ article, isLoading: false });
        });
      };

    
    showComments = () => {
        const {showComments} = this.state
        this.setState({showComments: !showComments})
    }

    getComments = (articleID, sort_by, order) => {
        api.fetchCommentsByArticleID(articleID, sort_by, order).then((comments) => {
          this.setState({ comments, isLoading: false });
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

    deleteComment = (removedComment) => {
        this.setState((currentState) => {
          return {
            comments: [...currentState.comments],
            delCommentToggle: !currentState.delCommentToggle
          };
        });
      };

}

export default ArticleByID;