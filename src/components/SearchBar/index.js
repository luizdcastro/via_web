import React from 'react';
import * as FiIcons from 'react-icons/fi'
import * as BsIcons from 'react-icons/bs'


import './styles.css';

const SearchBar = ({ onChange }) => {
    return (
        <div className="search-container">
            <FiIcons.FiSearch className="search-icon" style={{ fontSize: 22 }} />
            <input
                className="search-input"
                placeholder="Procurar pela região, material ou preço"
                type="text"
                onChange={onChange}
            />
            <BsIcons.BsFilterRight className="filter-icon" style={{ fontSize: 22 }} />
        </div>
    );
};

export default SearchBar;