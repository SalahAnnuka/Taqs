import {FaSearch} from "react-icons/fa";
import React, {useState} from "react";


function SearchBar(){

    const [input,setInput] = useState("");

    const fetchData = (value)=>{
        fetch('http:localhost:7777/MiniData')
        .then((response) => response.json())
        .then((json)=>{
            console.log(json);

        });
    }

    const handleChange = (value)=>{
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="SeachBar">
            <div className="search-box">
                <FaSearch className="search-icon"/>
                <input 
                    placeholder="Search by city name..." 
                    className="search-field"
                    value={input}
                    onChange={(e)=>handleChange(e.target.value)}
                />
            </div>
            <div className="search-results">Search Results</div>
        </div>
    );
}
export default SearchBar;