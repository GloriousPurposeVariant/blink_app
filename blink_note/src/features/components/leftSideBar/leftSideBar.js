import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, setFilter } from "../../filterSidebarSlice";
import "./leftSideBar.css";
import Pencil from "../../../assets/pencil.svg";
import Archive from "../../../assets/archive.svg";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const filterSidebar = useSelector(
    (state) => state.filterSidebar
  );
  const handleToggleSidebar = () => {
    !filterSidebar.isSidebarPinned && dispatch(toggleSidebar());
  };

  const handleMenuClick = (filter) => {
    dispatch(setFilter(filter));
  }

  return (
    <div onMouseEnter={handleToggleSidebar} onMouseLeave={handleToggleSidebar} className={`sidebar ${filterSidebar.isSidebarActive ? "active" : ""}`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => handleMenuClick('all')}>
          <div className="d-flex menu-content align-items-center">
            <img
              src={Pencil}
              className="blink-menu-icon cursor-pointer"
              alt="Pen"
            />
            {filterSidebar.isSidebarActive && <div className="menu-text">Notes</div>}
          </div>
        </li>
        <li className="sidebar-item" onClick={() => handleMenuClick('archived')}>
          <div className="d-flex menu-content align-items-center">
            <img
              src={Archive}
              className="blink-menu-icon cursor-pointer"
              alt="Pen"
            />
            {filterSidebar.isSidebarActive && <div className="menu-text">Archives</div>}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
