import {ReactComponent as HamburgerIcon} from "../../assets/hamburger.svg"
const HamburgerMenu = ({onToggleSidebar}) => {
  return (
    <div onClick={onToggleSidebar} className="p-1 hamburger-icon cursor-pointer">
      <HamburgerIcon />
    </div>
  );
};

export default HamburgerMenu;