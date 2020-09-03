import React from 'react';
import { Link } from "@reach/router";

const ArticleSnippets = (articles) => {
    return (
        <div className="ArticleSnippets">
            <p>{`${articles.length} articles`}</p>
            {articles.map((article)=>{
                return (
                        <section className="ArticleSnip" key={article.article_id} >
                            <Link to={`/articles/${article.article_id}`}>
                                <h2>{article.title}</h2>
                            </Link>
                            <p>Article ID: {article.article_id}</p>
                            <p>Topic: {article.topic}</p>
                            {/* <p>{article.body}</p> */}
                            <p>Votes: {article.votes}</p>
                            <p>Author: {article.author}</p>
                            <p>Date: {article.created_at}</p>
                            <p>Comment: {article.comment_count}</p>
                        </section>
                )
            })}
        </div>
    );
};

export default ArticleSnippets;