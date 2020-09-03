import axios from "axios"

const instance = axios.create({baseURL: "https://cd-news.herokuapp.com/api"})

export const fetchTopics = () => {
    return instance
        .get("/topics")
        .then((res) => {
        return res.data.topics;
    });
};

export const fetchArticles = (sort_by, order, author, topic) => {
    return instance
        .get("articles", {params: {sort_by, order, author, topic} })
        .then((res) => {
        return res.data.articles;
    });
};

export const fetchArticleByID = (articleID) => {
    return instance
        .get(`/articles/${articleID}`)
        .then((res) => {
        return res.data.article;
    });
};

export const fetchCommentsByArticleID = (articleID, sort_by, order) => {
    return instance
        .get(`/articles/${articleID}/comments`, {params: {sort_by, order}})
        .then((res) => {
        return res.data.comments;
    });
};

export const patchVotes = (type, ID, votes) => {
    return instance
        .patch(`/${type}/${ID}`, { inc_votes: votes })
        .then((res) => {
        return res.data;
    });
};

export const postComment = (articleID, username, body) => {
    return instance
        .post(`/articles/${articleID}/comments`, {username:username, body:body })
        .then((res) => {
        return res.data;
    });
};

export const patchComment = (commentID, body) => {
    console.log(commentID, body, "<<<< patch args")
    return instance
        .patch(`/comments/${commentID}`, { body })
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            console.dir(err)
            return err
        })
};

export const deleteComment = (commentID) => {
    return instance
        .delete(`/comments/${commentID}`)
        .then((res) => {
        return res.data;
    });
};
