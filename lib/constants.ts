import { NavItem } from "./types";
import { FiHome } from "react-icons/fi";
import { FaTools } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { MdInfo } from "react-icons/md";

export const navItems: NavItem[] = [
  {
    label: "Home",
    link: "#",
    iconImage: FiHome,
  },
  {
    label: "Skills",
    link: "#",
    iconImage: FaTools,
  },
  {
    label: "Projects",
    link: "#",
    iconImage: AiOutlineProject,
  },
  {
    label: "About",
    link: "#",
    iconImage: MdInfo,
  },
];
