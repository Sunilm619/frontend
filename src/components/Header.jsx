import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { sub_user } from "../store/UserSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handle_Logout = async (params) => {
    const response = await axios.post(
      Base_Url + "/logout",
      {},
      { withCredentials: true },
    );
    console.log(response);
    dispatch(sub_user());
    navigate("/login");
  };
  const User_Store = useSelector((store) => store.User_Store);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/myTrips" className="btn btn-ghost text-xl">
            AI-TRAVEL-PLANNER
          </Link>
        </div>

        <div>{User_Store?.name && <h1>Welcome {User_Store?.name}!!</h1>}</div>

        {User_Store && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>

                <li>
                  <button onClick={handle_Logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
