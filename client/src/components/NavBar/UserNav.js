import SearchBar from './SearchBar';
import taqs_white from '../drawable/taqs-white.svg';

function UserNav(){
    return (
      <div className="HomeNav">
        <img className="logo" src={taqs_white}/>
        <SearchBar/>
      </div>
    );
  }

  export default UserNav;