import PropTypes from "prop-types";
import { Minus, X, Maximize } from "lucide-react";
import ProgramEmbed from "./app-program";
import { appComponents } from "../../config/appComponents";
import { useState, useEffect, useRef } from "react";
import "./Window.css";
import {
  motion,
  
} from "motion/react";

// !---------------------

export default function Window({
  className = "WindowContainer",
  type,
  label = "Window",
  theme,
  icon,
  onClick,
  windowId,
  appId,
  src,
  x = 0,
  y = 0,
  width = window.innerHeight * 0.5,
  height = window.innerHeight * 0.6,
  zIndex = 0,
  startWindowDrag,
  handleCloseWindow,
  minimizeOpenWindow,
  expandOpenWindow,
  startWindowResize,
  children,
  ...props
}) {
  const AppComponent = appComponents[label];

  let Folder;
  theme === "light" ? (Folder = "light") : (Folder = "dark");

  return (
    
    <motion.div
    onani
      initial={{ opacity: 0, scale: 0.9, y: y, x:x }}
		  animate={{ opacity: 1, scale: 1, y: 0 }}
		  exit={{ opacity: 0, scale: 0.9 }}
		  transition={{ type: "spring", 
			stiffness: 300, // higher = snappier
			damping: 25, // higher = less bounce 
			}}
      className={className}
      src={src}
      style={{
        position: "absolute",
        zIndex,
        left: x,
        top: y,
        width:width,
        height:height,
        userSelect: "none",
      }}
      {...props}
    >
      <div
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
      </div>
      <div className="window-content">
        {type === "external" ? (
          <ProgramEmbed src={src} title={label} />
        ) : AppComponent ? (
          <AppComponent theme={theme} />
        ) : null}
      </div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"E")}
        style={{
          position: "absolute",
          top: 4,
          right: -3,
          width: 6,
          bottom: 4,
          cursor: "ew-resize",
          backgroundColor:"blue",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"S")}
        style={{
          position: "absolute",
          left: 4,
          bottom: -3,
          height: 6,
          right: 4,
          cursor: "ns-resize",
          backgroundColor:"red",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"W")}
        style={{
          position: "absolute",
          top: 4,
          left: -3,
          width: 6,
          bottom: 4,
          cursor: "ew-resize",
          backgroundColor:"lime",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"N")}
        style={{
          position: "absolute",
          left: 4,
          top: -3,
          right:4,
          height: 6,
      
          cursor: "ns-resize",
          backgroundColor:"lightblue",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"SE")}
        style={{
          position: "absolute",
          right: -3,
          bottom: -3,
          width: 10,
          height:10,
          cursor: "nwse-resize",
          backgroundColor:"pink",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"SW")}
        style={{
          position: "absolute",
          left: -3,
          bottom: -3,
          width: 10,
          height:10,
          
          cursor: "nesw-resize",
          backgroundColor:"purple",
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"NE")}
        style={{
          position: "absolute",
          backgroundColor:"green",
          right: -3,
          top: -3,
          width: 10,
          height:10,
          
          cursor: "nesw-resize",
          
        }}
      ></div>
      <div
      onMouseDown={(e)=>startWindowResize(e,windowId,"NW")}
        style={{
          position: "absolute",
          left: -3,
          top: -3,
          width: 10,
          height:10,
          bottom: 10,
          cursor: "nwse-resize",
          backgroundColor:"orange",
        }}
      ></div>
    </motion.div>
  );
}
Window.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
};
