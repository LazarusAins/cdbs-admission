import logo from "../../../assets/images/logo.png";
import accountIcon from "../../../assets/images/account-icon.png";
import book from "../../../assets/images/literature-review.png";
import settings from "../../../assets/images/settings.png";

import SideLink from "./SideLink";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";

function Sidebar({ setPage }) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  // console.log(user);
  return (
    <aside className="side-dashboard">
      <div className="sidebar-container">
        <div className="welcome-container">
          <img src={logo} className="side-logo" />
          <div className="welcome-text">
            <h2>Welcome back!</h2>
            <h3>Good morning, {user["firstName"]}!</h3>
          </div>
        </div>
        <div
          onClick={() => {
            setPage("profile");
            console.log(user);
          }}
        >
          <SideLink icon={accountIcon} labelText={"My Account"} />
        </div>
        <SideLink icon={book} labelText={"Contact Directory"} />
        <SideLink icon={settings} labelText={"Settings"} />
      </div>
      <button
        className="btn-blue btn-logout btn"
        onClick={async () => {
          var result = await Swal.fire({
            title: "Log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonColor: "No",
          });
          if (result.isConfirmed) {
            navigate("/");
            localStorage.clear();
          } else {
            return;
          }
          // clearModalRegister();
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
