import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function SearchList({result,clearInput,Username}){
    const navigate = useNavigate();
    const [cityData,setCityData] = useState();

    function handleClick(country,city)
    {
        navigate(`/User/${Username}/${country}/${city}`);
        clearInput();
    }

    result = result.slice(0,25);
    if (result.length > 0)
    return (
            <div className="search-results">
                {
                    result.map((item, id) => {
                        return (
                                <button key={id} className="search-result" onClick={() => handleClick(item.country,item.name)}>{item.name}, {item.country}</button>
                        );
                    })
                }
            </div>
        );
}

export default SearchList;