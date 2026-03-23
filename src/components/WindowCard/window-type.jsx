import PropTypes from "prop-types";
import { Minus, X, Maximize } from "lucide-react";
import ProgramEmbed from "./app-program";
import { useState,useEffect,useRef } from "react";
import "./Window.css";


// !---------------------

export default function Window({
  className = "WindowContainer",
  label = "Window",
  theme,
  icon,
  onClick,
  windowId,
  appId,
  src,
  x = 0,
  y = 0,
  width = "50vw",
  height = "60vh",
  zIndex = 0,
  startWindowDrag,
  handleCloseWindow,
  minimizeOpenWindow,
  expandOpenWindow,
  children,
  ...props
}) {

  

let Folder;
  theme==="light"? Folder = "light": Folder="dark"

  return (
    <div
      className={`pixel-card ${className}`}
      src={src}
      style={{
        position: "absolute",
        zIndex,
        left: x,
        top: y,
        width,
        height,
        userSelect: "none",
      }}
      
      {...props}
    >
      <header
        className="TitleBar"
        
        onMouseDown={(e) => startWindowDrag(e, windowId)}
        
      >
        
        <img src={"/appIcons/" + Folder + icon} alt="icon" size="1" />
        <p className="title">{label}</p>
        <div className="tools">
          <button
            className=" Btn Minimize"
            type="button"
            onClick={() => minimizeOpenWindow(windowId)}
          >
            <Minus></Minus>
          </button>
          <button
            className=" Btn Maximize"
            type="button"
            onClick={() => expandOpenWindow(windowId)}
          >
            <Maximize></Maximize>
          </button>
          <button
            className=" Btn Exit"
            onClick={() => handleCloseWindow(windowId)}
            type="button"
          >
            <X></X>
          </button>
        </div>
      </header>
      <div className="window-content">
  <ProgramEmbed src={src} title={label} />
</div>

<canvas className="pixel-canvas"  />
      
    </div>
  );
}
Window.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
};
