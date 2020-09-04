import React, { Component } from 'react';
import * as api from "../utils/api";
import Loader from "./Loader";
import Article from "./Article"
import CommentsList from "./CommentsList";
import ErrorPage from './ErrorPage';

class ArticleByID extends Component {

    state = {
        article: {},
        isLoading: true,
        showComments: false,
        err: null
    }

    componentDidMount(){
        const { articleID } = this.props;
        this.getArticleByID(articleID)
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { articleID } = this.props;
        if (prevProps.articleID !== articleID) {
            this.getArticleByID(articleID);
            this.setState({ isLoading: true });
        }
    }
    
    render() {
        const { article, isLoading, showComments, err} = this.state
        const {user, articleID} = this.props
        if (isLoading) return <Loader />;
        if (err) return <ErrorPage status={err.status} msg={err.msg}/>
        return (
            <section>
                {Article(article)}
                <button onClick={this.showComments}>{showComments? "hide" : "show"} comments</button>
                <section>
                    {(showComments) && 
                    <CommentsList articleID={articleID} user={user} showComments={showComments}/>}
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
}

export default ArticleByID;