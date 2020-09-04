import React, { Component } from 'react';

class Login extends Component {

    state = {
        newUser: "",
        error: false,
        users: ["jessjelly", "grumpy19", "tickle122", "weegembump", "happyamy2016", "cooljmessy"]
      };

    render() {
        const {user} = this.props
        const {newUser, error, users} = this.state

        return (
            <section className="App-LoginForm">
                {user ? 
                    <>
                        <p>{`Logged in as '${user}'`}</p>
                        <button onClick={this.handleClick}>logout</button>
                    </> 
                    :
                    <>
                        <p>{`You are not logged in - please choose a username`}</p>
                        <select id="newUser" name="cars" onChange={this.handleChange} value={newUser}>
                            {users.map((user)=>{
                                return(
                                    <option key={user} value={user}>{user}</option>
                                )
                            })}
                        </select>
                        <button onClick={this.handleClick} className="App-LoginForm_LoginBtn">login</button>
                        <p className="submitError">{error && "Please select a username"}</p>
                    </>
                }
            </section>
            );
        };

    handleChange = (changeEvent) => {
        const { id, value } = changeEvent.target;
        this.setState({ [id]: value });
      };
    
    handleClick = (clickEvent) => {
        const {newUser, error} = this.state
        const {user, updateUser} = this.props
        if (user ==="" && newUser === ""){
            this.setState({error: !error})
          } else {
            updateUser(newUser);
            this.setState({newUser: ""})
            }
    }

}

export default Login;

