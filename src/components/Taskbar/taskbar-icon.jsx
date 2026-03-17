import PropTypes from "prop-types";
import { File } from "lucide-react";

import "./Taskbar.css"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export default function TaskbarIcon({
  size = 30,
  color = "currentColor",
  className = "taskbarIconContainer",
  title = "Taskbar icon",
  image = null,
  taskbarID,
  appId,
  windowId,
  restoreWindow,
  x = 0,

  ...props
}) {

  



  return (
    <div
      className={className}
      image={image}
      style={{ userSelect: "none" }}
      onClick={() => restoreWindow(windowId)}
      {...props}
    >
      {image ? (
        <div
          className="TaskbarIconImage"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
            width: typeof size === "number" ? `${size}px` : size,
            height: typeof size === "number" ? `${size}px` : size,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <File className="TaskbarIconImage" size={size}></File>
      )}
    </div>
  );
}


TaskbarIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};
