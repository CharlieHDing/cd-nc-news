import React from 'react';

const FilterBar = (setSortBy, setOrder, sortOptions, orderOptions) => {
    return (
        <div className="App-filterBar">
            <label className="App-filterBar_label">
                Sort by:
                <br/>
                {sortOptions.map((option)=>{
                    return <button onClick={setSortBy} id={option} key={option} className="App-filterBar_Button">{option} </button>
                })}
            </label>
            <br/>
            <label className="App-filterBar_label">
                Order
                <br/>
                {orderOptions.map((option)=>{
                    return <button onClick={setOrder} id={option} key={option} className="App-filterBar_Button">{option}</button>
                })}
            </label>
        </div>
    );
};

export default FilterBar