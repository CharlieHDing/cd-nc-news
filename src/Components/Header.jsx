import React from 'react';

const Header = () => {
    return (
        <header className="App-header">
            <img src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" className="App-logo" alt="logo" />
            <h1> News </h1>
            <input type="text" id="search" name="search" defaultValue="search..."></input>
      </header>
    );
};

export default Header;