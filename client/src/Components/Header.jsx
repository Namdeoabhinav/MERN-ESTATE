import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Estate</span>
              <span className="text-slate-700">Ease</span>
            </h1>
          </Link>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>

          <ul className="flex gap-4">
            <Link to='/'>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
            </Link> 
            <Link to='/about'>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
            </Link>
            
            <Link to='/profile'>
            {/* Here we are updating the header with the user's google account profile picture */}
            {/*When clicking on the profile pic we are directed to the profile page. We only want signed in users to go to profile.
            For this creating the PrivateRoute.jsx */}
            {currentUser? (<img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile"/>):(<li className=" text-slate-700 hover:underline">
              Sign In
            </li>) }
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}
