import styled from "styled-components";
import React from "react";

export const Cursor = () => {
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    if (cursorRef.current == null || cursorRef == null) return;
    document.addEventListener("mousemove", (e) => {
      if (cursorRef.current == null) return;
      cursorRef.current.setAttribute(
        "style",
        "top: " + e.pageY + "px; left: " + e.pageX + "px;"
      );
      if (e.target.tagName === "A") {
        cursorRef.current.classList.add("links");
      } else {
        cursorRef.current.classList.remove("links");
      }
    });
    document.addEventListener("click", () => {
      if (cursorRef.current == null) return;
      cursorRef.current.classList.add("expand");
      setTimeout(() => {
        if (cursorRef.current == null) return;
        cursorRef.current.classList.remove("expand");
      }, 500);
    });
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
};
