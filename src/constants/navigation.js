import { PiTelevisionFill } from "react-icons/pi";
import { MdMovieCreation } from "react-icons/md";
import { FaHome, FaSearch } from "react-icons/fa";

export const navItems = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill size={26}/>,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovieCreation size={26} />,
  },
];

export const MobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome size={26} />,
  },
  ...navItems,
  {
    label: 'Search',
    href: '/search',
    icon: <FaSearch size={26} />
  }
];
