import React, { Component } from 'react';
import { Link } from "@reach/router";
import * as api from "../utils/api";

class Nav extends Component {

    state = {
        topics:{},
        isLoading: true
    }

    componentDidMount(){
        this.getTopics()
    }

    render() {
        const topicArray = Object.values(this.state.topics)
        return (
            <nav className="App-NavBar">
                        <Link to={`/`}>
                            <button className="App-NavBar_Button">all</button>
                        </Link>
                {topicArray.map((topic)=>{
                    return (
                        <Link to={`topics/${topic.slug}/articles`} key={topic.slug}>
                            <button className="App-NavBar_Button">{topic.slug}</button>
                        </Link>
                    )
                })}
            </nav>
        );
    }

    getTopics = () => {
        api.fetchTopics().then((topics) => {
          this.setState({ topics, isLoading:false});
        });
      };
}

export default Nav;