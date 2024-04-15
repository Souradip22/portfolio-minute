import { IconType } from "react-icons";
export type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: IconType;
};
