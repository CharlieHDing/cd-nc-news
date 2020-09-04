import React from 'react';

const FilterBar = (setSortBy, setOrder, sortOptions, orderOptions) => {
    const sortOptionsArray = Object.entries(sortOptions)
    const orderOptionsArray = Object.entries(orderOptions)
    return (
        <div className="App-filterBar">
            <label className="App-filterBar_label">
                Sort by:
                <br/>
                {sortOptionsArray.map((option)=>{
                    return <button onClick={setSortBy} id={option[0]} key={option[0]} className="App-filterBar_Button">{option[1]} </button>
                })}
            </label>
            <br/>
            <label className="App-filterBar_label">
                Order
                <br/>
                {orderOptionsArray.map((option)=>{
                    return <button onClick={setOrder} id={option[0]} key={option[0]} className="App-filterBar_Button">{option[1]}</button>
                })}
            </label>
        </div>
    );
};

export default FilterBar