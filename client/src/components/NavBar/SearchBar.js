import {FaSearch} from "react-icons/fa";

function SearchBar(){
    return (
        <div className="SeachBar">
            <FaSearch className="search-icon"/>
            <input placeholder="Search by city name..." className="search-field"/>
        </div>
    );
}
export default SearchBar;