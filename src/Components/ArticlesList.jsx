import React, { Component } from 'react';
import * as api from "../utils/api";
import Loader from "./Loader";
import ArticleSnippets from "./ArticleSnippets"
import FilterBar from "./FilterBar"


class ArticlesList extends Component {

    state = {
        articles:{},
        sort_by: "votes",
        order: "desc",      
        isLoading: true
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
        if (this.state.isLoading) return <Loader />;
        return (
            <section >
              {FilterBar(this.setSortBy, this.setOrder, ["votes", "created_at", "comment_count"], ["desc", "asc"])}
              {ArticleSnippets(this.state.articles)}
            </section>
        );
    }

    getArticles = (sort_by, order, topic, author) => {
        api.fetchArticles(sort_by, order, author, topic).then((articles) => {
          this.setState({ articles, isLoading: false });
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

export default ArticlesList;