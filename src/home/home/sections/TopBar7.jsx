import React, { useState, useEffect } from "react";
import { debounce, classList } from "utils";
import {Icon} from "@mui/material";
import {IconButton} from "@mui/material";
import { NavLink } from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import { Button } from "@mui/material";

const TopBar7 = (props) => {
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? "menu" : "close";

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  const close = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);

  return (
    <section
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div className="container header-container">
        <div className="brand">
          <img src="./assets/images/react-logo.svg" alt="" />
        </div>
        <ul className="navigation">
          <li>
            <NavLink to="/demos">Demos</NavLink>
          </li>
          <li>
            <ScrollTo to="intro7" onScroll={close}>
              Home
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="services8" onScroll={close}>
              Works
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="courseList1" onScroll={close}>
              Courses
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="marketing2" onScroll={close}>
              Admission
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="testimonial1" onScroll={close}>
              Review
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="subscription1" onScroll={close}>
              Subscribe
            </ScrollTo>
          </li>
        </ul>
        <div className="m-auto" />
        <div className="navigation flex">
          <NavLink to="/login" className="mr-1">
            <Button
              className="box-shadow-none px-8 rounded-l hover-bg-primary capitalize"
              variant="outlined"
              color="primary"
            >
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button
              className="box-shadow-none px-8 rounded-r hover-bg-primary capitalize"
              variant="outlined"
              color="primary"
            >
              Signup
            </Button>
          </NavLink>
        </div>
        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
        </IconButton>
      </div>
    </section>
  );
};

export default TopBar7;
