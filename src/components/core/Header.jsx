import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Header() {
  // const toogleBtn = useRef();
  const { userToken, currentUser, logout } = useStateContext();

  const toogle = (event) => {
    document.getElementById("root").classList.toggle("body-pd");
    document.getElementById("header-toggle").classList.toggle("bx-x");
    document.getElementById("nav-bar").classList.toggle("show");
    document.getElementById("header").classList.toggle("body-pd");
  };

  const navigations = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <i className="bx bx-home nav_logo-icon"></i>,
    },
    {
      name: "Membres",
      to: "/members",
      icon: <i className="fa fa-users" aria-hidden="true"></i>,
    },
    {
      name: "Ouvriers",
      to: "/workers",
      icon: <i className="bx bx-user nav_icon"></i>,
    },
    {
      name: "Departement",
      to: "/departments",
      icon: <i className="bx bx-layer nav_icon"></i>,
    },
    {
      name: "Rapports",
      to: "/reports",
      icon: <i className="bx bx-folder nav_icon"></i>,
    },
    {
      name: "Statistiques",
      to: "/statistics",
      icon: <i className="bx bx-bar-chart-alt-2 nav_icon"></i>,
    },
    {
      name: "Paramètres",
      to: "/settings",
      icon: <i className="bx bx-cog nav_icon"></i>,
    },
  ];

  return (
    <>
      <header className="header" id="header">
        <div className="header_toggle">
          <i onClick={toogle} className="bx bx-menu" id="header-toggle"></i>
        </div>
        <div className="d-flex align-items-center">
          {currentUser && currentUser.worker && (
            <>
              <p className="py-0 my-0 me-2">{`${currentUser.worker.firstName} ${currentUser.worker.lastName}`}</p>
              <div className="header_img">
                {/* <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> */}
                <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
              </div>
            </>
          )}
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <a className="nav_logo text-decoration-none">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">BBBootstrap</span>
            </a>
            <div className="nav_list">
              {navigations.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="nav_link text-decoration-none"
                  title={link.name}
                >
                  {link.icon}
                  <span className="nav_name">{link.name}</span>
                </NavLink>
              ))}
              {/* <a href="#" className="nav_link active">
                  <i className="bx bx-grid-alt nav_icon"></i>
                </a> */}
              {/* <a href="#" className="nav_link">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Messages</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-bookmark nav_icon"></i>
                <span className="nav_name">Bookmark</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Files</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                <span className="nav_name">Stats</span>
              </a> */}
            </div>
          </div>
          <a
            className="nav_link text-decoration-none"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
    </>
  );
}
