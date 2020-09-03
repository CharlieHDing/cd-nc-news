import React from 'react';
import { Link } from "@reach/router";
import Voter from "./Voter"

const Article = (article) => {
    const time = Date.parse(article.created_at).toLocaleString('en-GB', { timeZone: 'UTC' })
    console.log(time)
    return (
        <section className="Article">
            <h2>{article.title}</h2>
            <p>Article ID: {article.article_id}</p>
            <p>Topic: {article.topic}</p>
            <p>{article.body}</p>
            <Voter id={article.article_id} type="articles" votes={article.votes}/>
            <Link to={`/authors/${article.author}/articles`}><p>Author: {article.author}</p></Link>
            <p>Date: {article.created_at}</p>
            <p>Comment: {article.comment_count}</p>
            <button>Delete Article</button>
            <button>Edit Article</button>
        </section>
    );
};

export default Article;
