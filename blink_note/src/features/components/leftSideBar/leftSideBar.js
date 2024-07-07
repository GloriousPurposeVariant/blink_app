import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, setFilter } from "../../filterSidebarSlice";
import "./leftSideBar.css";
import Pencil from "../../../assets/pencil.svg";
import Archive from "../../../assets/archive.svg";

const Menus = [
  { src: Pencil, alt: "Pen", text: "Notes", filter: "active" },
  { src: Archive, alt: "Archive", text: "Archives", filter: "archived" },
];

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const filterSidebar = useSelector((state) => state.filterSidebar);
  const handleToggleSidebar = () => {
    !filterSidebar.isSidebarPinned && dispatch(toggleSidebar());
  };

  const handleMenuClick = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div
      onMouseEnter={handleToggleSidebar}
      onMouseLeave={handleToggleSidebar}
      className={`sidebar ${filterSidebar.isSidebarActive ? 'active' : ''}`}
    >
      <ul className="sidebar-menu">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className={`sidebar-item ${filterSidebar.filter ===  menu.filter ? 'active' : ''}`}
            onClick={() => handleMenuClick(menu.filter)}
          >
            <div className="d-flex menu-content align-items-center">
              <img
                src={menu.src}
                className="blink-menu-icon cursor-pointer"
                alt={menu.alt}
              />
              {filterSidebar.isSidebarActive && (
                <div className="menu-text">{menu.text}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
