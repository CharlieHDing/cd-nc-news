import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router";

import Header from "./Components/Header"
import Nav from "./Components/Nav"
import ArticlesList from "./Components/ArticlesList"
import ArticleByID from "./Components/ArticleByID"
import ErrorPage from "./Components/ErrorPage"


class App extends Component {

  state={user: "jessjelly"}

  render() {
    const {user} = this.state
    return (
      <div className="App">
        <Header />
        <p>user: {user}</p>
        <button onClick={()=>{
          this.setState({user:null})
        }}>
          Logout
        </button>
        <Nav />
        <Router>
          <ArticlesList path="articles"/>
          <ArticlesList path="topics/:topic/articles"/>
          <ArticlesList path="authors/:author/articles"/>
          <ArticleByID path="/articles/:articleID" user={user}/>
          <ErrorPage default status={404} msg={"Path not found"} />
        </Router>
      </div>
    );
  }
}

export default App;
