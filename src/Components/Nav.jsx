import React, { Component } from 'react';
import { Link } from "@reach/router";
import * as api from "../utils/api";

class Nav extends Component {

    state = {
        topics:{},
        // authors:{},
        // topicsVisible: true,
        isLoading: true
    }

    componentDidMount(){
        this.getTopics()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { articleID } = this.props;
    //     if (prevState.showComments !== this.state.showComments) {
    //         this.getComments(articleID)
    //         this.setState({ isLoading: true });
    //     }
    //     if (prevProps.articleID !== this.props.articleID) {
    //         this.getArticleByID(articleID);
    //         this.setState({ isLoading: true });
    //     }
    // }

    render() {
        const topicArray = Object.values(this.state.topics)
        return (
            <nav className="App-NavBar">
                        <Link to={`articles`}>
                            <button className="App-NavBar_Button">All</button>
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