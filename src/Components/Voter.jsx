import React, { Component } from 'react';
import * as api from "../utils/api";

class Voter extends Component {
    state = {
        upVote: false
    }
    updateVotes = (type, upVote) => {
        if (upVote) {
            api.patchVotes(type, this.props.id, 1)
        } else {
            api.patchVotes(type, this.props.id, -1) 
        }
        this.setState({upVote: !upVote})
    }

    render() {
        const {type, votes} = this.props
        const {upVote} = this.state
        return (
            <>
                <button onClick={()=>this.updateVotes(type, upVote)}>
                    {upVote ? "Unvote" : "Vote"}
                </button>
                <p>Votes: {votes + (upVote ? 1 : 0)}</p>
            </>
        );
    }

}

export default Voter;