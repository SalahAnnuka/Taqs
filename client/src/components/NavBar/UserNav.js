import taqs_white from './drawable/taqs-white.svg';

function UserNav(){
    return (
      <div className="HomeNav">
        <img className="logo" src={taqs_white}/>
        <form>
            <input type='text' placeholder='Enter Your Query...'/>
            <button>Search</button>
        </form>
      </div>
    );
  }

  export default UserNav;