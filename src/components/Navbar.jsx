import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Button from "./ui/Button";
import { Dropdown, DropdownItem } from "./ui/Dropdown";
import useThemeToggle from "../hooks/useTheme";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { routes, authRoutes } from "../helpers/routes";
import Link from "./ui/Link";
import { Link as DomLink } from "react-router-dom";
import Omnisense from "./Omnisense";
import useViewport from "../hooks/useViewport";
import Tooltip from "./ui/Tooltip";
import { logOut } from "../config/auth";

const Navbar = ({ toggleSideNavbar }) => {
  const { toggleTheme, icon } = useThemeToggle();
  const { user, reset } = useAuth();
  const { viewWidth } = useViewport();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    logOut();
    reset();
  };

  return (
    <motion.div
      className={`sticky flex justify-between w-full p-4 gap-3 z-40 bg-primary rounded-md
      ${lastScrollY > 50 ? "border border-secondary-accent" : ""}`}
      initial={{ y: 0 }}
      animate={isScrollingDown ? { y: -100 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex justify-center items-center gap-2">
        {viewWidth <= 768 && (
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSideNavbar}
            className="hover:cursor-pointer"
          />
        )}
        {viewWidth > 768 && <Omnisense />}
      </div>
      <div className="flex w-full justify-center items-center gap-1">
        {user &&
          viewWidth > 768 &&
          routes.map((route, index) => (
            <Tooltip key={index} text={route.name}>
              <Link path={route.path} icon={route.icon} />
            </Tooltip>
          ))}
        {!user &&
          viewWidth > 768 &&
          authRoutes.map((route, index) => (
            <Tooltip key={index} text={route.name}>
              <Link path={route.path} name={route.name} icon={route.icon} />
            </Tooltip>
          ))}
      </div>
      <div className="flex w-fit gap-2 justify-center items-center">
        <Tooltip text="Toggle theme">
          <Button
            variant="default_rounded"
            icon={icon}
            onClick={toggleTheme}
            className="p-2"
          />
        </Tooltip>
        {user && (
          <Dropdown
            tooltip="Account"
            variant="default_rounded"
            p={1}
            name={
              user?.photoURL ? (
                <img
                  loading="lazy"
                  src={user?.photoURL}
                  className="overflow-hidden max-w-[30px] max-h-[30px] rounded-full"
                />
              ) : (
                <div
                  className="flex justify-center items-center w-[30px] h-[30px] rounded-full
                  font-semibold text-primary-highlight text-xs"
                >
                  <p className="text-center">{user?.displayName[0]}</p>
                </div>
              )
            }
          >
            <DropdownItem asChild={true}>
              <DomLink
                to={`/${user?.displayName}`}
                className="flex p-2 text-xs text-primary-foreground outline-none rounded-md
                transition-all duration-300 w-full justify-end items-center
                hover:bg-primary hover:cursor-pointer focus:bg-primary"
              >
                Profile
                <FontAwesomeIcon size="xs" icon={faUser} className="ml-1" />
              </DomLink>
            </DropdownItem>
            <DropdownItem asChild={true}>
              <DomLink
                to="/settings"
                className="flex p-2 text-xs text-primary-foreground outline-none rounded-md
                transition-all duration-300 w-full justify-end items-center
                hover:bg-primary hover:cursor-pointer focus:bg-primary"
              >
                Settings
                <FontAwesomeIcon size="xs" icon={faGear} className="ml-1" />
              </DomLink>
            </DropdownItem>
            <DropdownItem
              text="Sign out"
              icon={faSignOut}
              onClick={handleLogout}
            />
          </Dropdown>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
