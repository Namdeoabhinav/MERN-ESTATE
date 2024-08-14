import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

//In this component we are making sure that only the signed in user is able to see the profile page on clicking the profile section
export default function PrivateRoute() {
    const {currentUser}  = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>;
}
