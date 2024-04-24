import { IconType } from "react-icons";
export type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: IconType;
  activeRoute?: any;
  setActiveRoute?: any;
  scrollToSection?: any;
  themeProps?: SingleThemeProps;
};

export type SingleThemeProps = {
  bgColorLight: string;
  bgColorMedium: string;
  bgColorDeep: string;
  borderColorLight: string;
  borderColorMedium: string;
  borderColorDeep: string;
  textColorLight: string;
  textColorMedium: string;
  textColorDeep: string;
  fromColor: string;
  viaColor: string;
  toColor: string;
};

export type ThemeOptions = {
  [key in string]: SingleThemeProps;
};
