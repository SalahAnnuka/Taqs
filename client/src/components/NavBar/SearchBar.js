import {FaSearch} from "react-icons/fa";
import React, {useState} from "react";
import SearchList from "./SearchList";


function SearchBar(){

    const [input,setInput] = useState("");
    const [result,setResult] = useState([]);

    const fetchData = async (searchQuery) => {
        try {
            if (searchQuery)
            {
                const response = await fetch(`http://localhost:7777/MiniData/${searchQuery}`);
                const data = await response.json();
                console.log(data);
                // Optionally, you can return the filtered data
                setResult(data);
            }
            else setResult([]);

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors appropriately, e.g., display an error message
            setResult([]);
        }
    };

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
            <SearchList result = {result}/>
        </div>
    );
}
export default SearchBar;