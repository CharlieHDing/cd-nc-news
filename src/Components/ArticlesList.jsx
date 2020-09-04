import React, { Component } from 'react';
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrorPage from './ErrorPage';
import FilterBar from "./FilterBar"

class ArticlesList extends Component {

  state = {
    articles:{},
    sort_by: "votes",
    order: "desc",      
    isLoading: true,
    err: null
  }

  componentDidMount(){
    const {sort_by, order} = this.state
    const {topic, author} = this.props
    this.getArticles(sort_by, order, topic, author)
  }

  componentDidUpdate(prevProps, prevState) {
    const {sort_by, order} = this.state
    const {topic, author} = this.props
    if (prevProps.topic !== topic || prevProps.author !== author || prevState.sort_by !== sort_by || prevState.order !== order) {
        this.getArticles(sort_by, order, topic, author);
        this.setState({ isLoading: true });
      }
    }

  render() {
    const {isLoading, articles, err} = this.state
    if (isLoading) return <Loader />;
    if (err) return <ErrorPage status={err.status} msg={err.msg}/>
    return (
      <section className="App-Articles">
        <p>{`Number of articles: ${articles.length}`}</p>
        {FilterBar(this.setSortBy, this.setOrder, {votes:"number of votes", created_at:"time created", comment_count: "number of comments"}, {desc: "descending", asc: "ascending"})}
        {articles.map((article)=>{
          const date = new Date(article.created_at).toLocaleDateString();
          return (
            <section className="App-Articles_Snippet" key={article.article_id} >
              <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
              </Link>
              <p>Topic: {article.topic}</p>
              <p>Votes: {article.votes}</p>
              <p>Author: {article.author}</p>
              <p>Date: {date}</p>
              <p>Comments: {article.comment_count}</p>
            </section>
          )
        })}
      </section>
    );
  }

  getArticles = (sort_by, order, topic, author) => {
    api.fetchArticles(sort_by, order, author, topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    })
    .catch((err)=>{
      const {msg} = err.response.data
      const {status} = err.response
      console.dir(err.response)
      this.setState({ err:{status, msg}, isLoading: false })
    })
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

export default ArticlesList;