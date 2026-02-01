import React from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar = ({ onChange }) => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <Search
                    color="#4A90E2"
                    size={20}
                />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Where do you want to go?"
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
                <Mic
                    color="#D32F2F"
                    size={20}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
