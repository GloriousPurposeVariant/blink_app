import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, toggleView } from "../filterSidebarSlice";
import HamburgerMenu from "./hamburger";
import BlinkLogo from "../../assets/blink_logo.jpg";
import GridView from "../../assets/gridView.png";
import ListView from "../../assets/listView.png";

const NavBar = () => {
  const sidebar = useSelector((state) => state.filterSidebar);
  const dispatch = useDispatch();

  const handleViewToggle = (view) => {
    dispatch(toggleView(view));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar({ pin: sidebar.isSidebarActive ? "unpin" : "pin" }));
  };

  return (
    <div className="d-flex navbar-container justify-content-between">
      <div className="d-flex ps-14px">
        <HamburgerMenu onToggleSidebar={handleToggleSidebar} />
        <div className="d-flex align-items-center px-10px">
          <img
            src={BlinkLogo}
            className="blink-note-logo cursor-pointer"
            alt="Blink Logo"
          />
          <div
            className="cursor-pointer dy-font-size"
            style={{ marginLeft: "10px" }}
          >
            Blink Notes
          </div>
        </div>
      </div>
      <div className="pe-16px">
        {sidebar.view === "list_view" ? (
          <div className="add-icons-container" onClick={() => handleViewToggle('grid_view')}>
            <img src={GridView} alt="GridView" className="add-tools-icon" />
          </div>
        ) : (
          <div className="add-icons-container" onClick={() => handleViewToggle('list_view')}>
            <img src={ListView} alt="ListView" className="add-tools-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
