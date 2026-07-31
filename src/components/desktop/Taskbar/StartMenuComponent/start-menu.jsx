"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  // correctBorderRadius,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import "./StartMenu.css"

function TaskbarItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  
}) {
  const ref = useRef(null);
  const ishovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize,
    };
    return val - (rect.left + rect.width / 2);
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height:size,
      }}
      onHoverStart={() => ishovered.set(1)}
      onHoverEnd={() => ishovered.set(0)}
      onFocus={() => ishovered.set(1)}
      onBlur={() => ishovered.set(0)}
      onClick={onClick}
      className={`taskbar-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      
    >
      {Children.map(children, (child) => cloneElement(child, { ishovered,size }))}
    </motion.div>
  );
}

function TaskbarLabel({ children, className = "", ...rest }) {
  const { ishovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = ishovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [ishovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`taskbar-label ${className}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TaskbarIcon({
  children,
  className = "taskbarIconContainer",
  title = "Taskbar icon",
  image = null,
  size,
  style,
  taskbarID,
  appId,
  windowId,
  restoreWindow,
  toggleLorD,
  ...props
}) {
  return (
    <motion.div
      className={`taskbar-icon ${className}`}
      style={{ width: size, height: size,
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function StartMenu({
  theme,
  toggleLorD,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}){
    const mouseX = useMotionValue(Infinity);
  const ishovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight],
  );
  const heightRow = useTransform(ishovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  let Folder;
  theme==="light"? Folder = "light": Folder="dark"
  return(
    <motion.div 
    style={{height, scrollbarWidth: "none"}}
    className="TaskbarStartOuter">

    <motion.div
            onMouseMove={({ clientX }) => {
              ishovered.set(1);
              mouseX.set(clientX);
            }}
            onMouseLeave={() => {
              ishovered.set(0);
              mouseX.set(Infinity);
            }}
            className={`taskbarStart-panel ${className}`}
            style={{ height: panelHeight }}
            role="toolbar"
            aria-label="Application dock"
          >
            
            <TaskbarItem
            key={0}
            
            className={"light-dark"}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            onClick={()=>toggleLorD()}
            theme={theme}
            >
              <TaskbarIcon
              theme={theme}
              image={theme==="light" ? "/appIcons/light/theme.svg" : "/appIcons/dark/theme.svg"}
              />
              <TaskbarLabel theme={theme}>{theme=== "light" ? "Light Mode" : "Dark Mode"}</TaskbarLabel>
    
             
    
            </TaskbarItem>
          </motion.div>
    
    </motion.div>

  );  
}