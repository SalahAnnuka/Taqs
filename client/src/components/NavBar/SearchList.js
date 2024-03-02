import React from "react";
import { useNavigate } from "react-router-dom";

function SearchList({result}){
    const navigate = useNavigate();

    result = result.slice(0,10);
    if (result.length > 0)
    return (
            <div className="search-results">
                {
                    result.map((item, id) => {
                        return (
                                <button key={id} className="search-result" onClick={() => navigate("/City")}>{item.name}, {item.country}</button>
                        );
                    })
                }
            </div>
        );
}

export default SearchList;