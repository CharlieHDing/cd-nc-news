import React, { Component } from 'react';
import * as api from "../utils/api";
import Loader from "./Loader";
import Article from "./Article"
import CommentsList from "./CommentsList"
import CommentAdder from "./CommentAdder"
import FilterBar from './FilterBar';
import ErrorPage from './ErrorPage';

class ArticleByID extends Component {

    state = {
        article: [],
        isLoading: true,
        showComments: false,
        CommentChangeToggle: true,
        comments: [],
        sort_by: "votes", 
        order: "desc",
        err: null
    }

    componentDidMount(){
        const { articleID } = this.props;
        this.getArticleByID(articleID)
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {showComments, sort_by, order, CommentChangeToggle} = this.state
        const { articleID } = this.props;
        if (prevState.showComments !== showComments || prevState.sort_by !== sort_by || prevState.order !== order || prevState.CommentChangeToggle !== CommentChangeToggle) {
            this.getComments(articleID, sort_by, order)
            this.setState({ isLoading: true });
        }
        if (prevProps.articleID !== articleID) {
            this.getArticleByID(articleID);
            this.setState({ isLoading: true });
        }
    }
    
    render() {
        const { article, isLoading, showComments, comments, err} = this.state
        const {user} = this.props
        if (isLoading) return <Loader />;
        if (err) return <ErrorPage status={err.status} msg={err.msg}/>
        return (
            <section>
                {Article(article)}
                <CommentAdder articleID={this.props.articleID} user={user} commentsChanged={this.commentsChanged}/>
                <button onClick={this.showComments}>{showComments? "Hide" : "Show"} Comments</button>
                <section>
                    {(showComments) && 
                    <>
                        {FilterBar(this.setSortBy, this.setOrder, ["votes", "created_at"], ["desc", "asc"])}
                        <CommentsList comments={comments} user={user} commentsChanged={this.commentsChanged}/>
                    </>
                    }
                </section>
            </section>
        );
    }

    getArticleByID = (articleID) => {
        api.fetchArticleByID(articleID)
        .then((article) => {
          this.setState({ article, isLoading: false })
        })
        .catch((err)=>{
            const {msg} = err.response.data
            const {status} = err.response
            console.dir(err.response)
            this.setState({ err:{status, msg}, isLoading: false })
        })
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

export default ArticleByID;