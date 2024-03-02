import SearchList from "./NavBar/SearchList";
import UserNav from "./NavBar/UserNav";
import {Routes, Route} from "react-router-dom";
import UserPage from "./UserPage";
import City from "./City";


  function User(){
    return (
      <div className="Home">
        <UserNav/>
        <Routes>
          <Route exact path="/" element={<UserPage/>}/>
          <Route exact path="/City" element={<City/>}/>
        </Routes>
      </div>
    );
  }

  export default User;