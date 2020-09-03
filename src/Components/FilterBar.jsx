import React from 'react';

const FilterBar = (setSortBy, setOrder, sortOptions, orderOptions) => {
    return (
        <div>
            <label>
                sort
                {sortOptions.map((option)=>{
                    return <button onClick={setSortBy} id={option} key={option}>{option}</button>
                })}
            </label>
            <br/>
            <label>
                order
                {orderOptions.map((option)=>{
                    return <button onClick={setOrder} id={option} key={option}>{option}</button>
                })}
            </label>
        </div>
    );
};

export default FilterBar