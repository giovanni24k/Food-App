import classes from "./Navbar.module.css";

import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { IoExitSharp } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import Button from "./Button";

const Navbar = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isIconMenuVisible, setIsIconMenuVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isResponsiveMenuVisible, setIsResponsiveMenuVisible] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (windowWidth < 750) {
      setIsIconMenuVisible(true);
      setIsMenuVisible(false);
    } else {
      if (isResponsiveMenuVisible) setIsResponsiveMenuVisible(false);
      setIsIconMenuVisible(false);
      setIsMenuVisible(true);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, isResponsiveMenuVisible]);

  const onShowMenuHandler = () => {
    setIsResponsiveMenuVisible(!isResponsiveMenuVisible);
  };

  const menuContent = (
    <ul
      className={
        isMenuVisible ? classes.navbarList : classes.navbarResponsiveList
      }
    >
      <NavLink
        className={({ isActive }) =>
          isActive ? classes.active : classes.navLink
        }
        to="/"
        end
      >
        <li
          className={
            isMenuVisible
              ? classes.navbarElement
              : classes.navbarResponsiveElement
          }
        >
          <HiHome className={classes.icons} />
          Home
        </li>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? classes.active : classes.navLink
        }
        to="/cart"
        end
      >
        <li
          className={
            isMenuVisible
              ? classes.navbarElement
              : classes.navbarResponsiveElement
          }
        >
          <BsFillCartDashFill className={classes.icons} />
          Cart
        </li>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? classes.active : classes.navLink
        }
        to="myAccount"
        end
      >
        <li
          className={
            isMenuVisible
              ? classes.navbarElement
              : classes.navbarResponsiveElement
          }
        >
          <BsFillPersonFill className={classes.icons} />
          My Account
        </li>
      </NavLink>
    </ul>
  );

  return (
    <>
      <div className={classes.navbarContainer}>
        {isIconMenuVisible && (
          <div className={classes.iconMenuContainer}>
            <AiOutlineMenu
              onClick={onShowMenuHandler}
              className={classes.iconMenu}
            />
          </div>
        )}
        <NavLink
          className={({ isActive }) =>
            isActive ? classes.active : classes.navLink
          }
          to={"/"}
        >
          <h1 className={classes.title}>Food App</h1>
        </NavLink>
        {isMenuVisible && menuContent}
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={props.onLogoutHandler}>
            <IoExitSharp className={classes.icons} />
            Logout
          </Button>
        </div>
      </div>
      {isResponsiveMenuVisible && menuContent}
    </>
  );
};

export default Navbar;
