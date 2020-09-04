import React, { Component } from 'react';
import * as api from "../utils/api";

class Voter extends Component {

    state = {
        upVote: false
    }

    updateVotes = (type, upVote) => {
        const {id} = this.props
        if (upVote) {
            api.patchVotes(type, id, 1)
        } else {
            api.patchVotes(type, id, -1) 
        }
        this.setState({upVote: !upVote})
    }

    render() {
        const {type, votes} = this.props
        const {upVote} = this.state
        return (
            <>
                <button onClick={()=>this.updateVotes(type, upVote)}>
                    {upVote ? "unvote" : "vote"}
                </button>
                <p>Votes: {votes + (upVote ? 1 : 0)}</p>
            </>
        );
    }

}

export default Voter;