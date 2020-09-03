import React, { Component } from 'react';

class Login extends Component {
    state = {
        newUser: ""
      };

    render() {
        const {user} = this.props
        const {newUser} = this.state

        return (
            <form onSubmit={this.handleSubmit} className="App-LoginForm">
                <p>{`Logged in as '${user}'`}</p>
                <input
                    type="text"
                    name=""
                    id="newUser"
                    onChange={this.handleChange}
                    value={newUser}
                />
                <button className="App-LoginForm_LoginBtn">Login</button>
            </form>
            );
        };

    handleChange = (changeEvent) => {
        const { id, value } = changeEvent.target;
        this.setState({ [id]: value });
      };
    
    handleSubmit = (submitEvent) => {
        const {newUser} = this.state
        const {updateUser} = this.props
        submitEvent.preventDefault();
        if (newUser === ""){
        window.alert("Please type in a username")
        } else {
            updateUser(newUser);
        }
        this.setState({newUser: ""})
        }
}

export default Login;

