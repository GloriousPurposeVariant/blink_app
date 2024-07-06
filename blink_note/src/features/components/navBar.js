import { useSelector, useDispatch } from "react-redux";
import { addNote, updateNote, deleteNote } from "../noteSlice";
import { toggleSidebar } from "../filterSidebarSlice";
import HamburgerMenu from "./hamburger";
import BlinkLogo from "../../assets/blink_logo.jpg";

const NavBar = () => {
  const notes = useSelector((state) => state.notes);
  const sidebar = useSelector((state) => state.filterSidebar);
  const dispatch = useDispatch();

  const handleAddNote = (id, text) => {
    dispatch(addNote({ id, text }));
  };

  const handleChangeNote = (note) => {
    dispatch(updateNote(note));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote({ id }));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar({pin: sidebar.isSidebarActive ? 'unpin': 'pin' }));
  };

  return (
    <div className="d-flex navbar-container">
      <div className="d-flex ps-14px">
        <HamburgerMenu onToggleSidebar={handleToggleSidebar}/>
        <div className="d-flex align-items-center px-10px">
          <img
            src={BlinkLogo}
            className="blink-note-logo cursor-pointer"
            alt="Blink Logo"
          />
          <div className="cursor-pointer" style={{ marginLeft: "10px" }}>Blink Notes</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
