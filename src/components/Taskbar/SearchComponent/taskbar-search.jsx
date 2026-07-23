import "./taskbarSearch.css";
import { initApps } from "../../../config/apps";
import { ClickAwayListener } from "@mui/material";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function SearchResultItem({
  children,
  className = "",
  onDoubleClick,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const ishovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      top: 25,
      height: baseItemSize,
    };
    return val - (rect.top + rect.height/2);
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
      style={{  height: size }}
      onHoverStart={() => ishovered.set(1)}
      onHoverEnd={() => ishovered.set(0)}
      onFocus={() => ishovered.set(1)}
      onBlur={() => ishovered.set(0)}
      onDoubleClick={onDoubleClick}
      className={`searchbar-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child, { ishovered, size }),
      )}
    </motion.div>
  );         
}

function SearchResultLabel({children, className="",...rest}){
    return(
        <motion.div
        className={`SearchResult-label ${className}`}
          role="tooltip"
           >
            {children}
        </motion.div>
    );
}

function SearchResultIcon({
  children,
  className = "searchResultIconContainer",
  title = "SearchResult icon",
  image = null,
  size,
  style,
  appId,
  ...props
}) {
  return (
    <motion.div
      className={`SearchResult-icon ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function TaskbarSearch({
  appList,
  handleAppOpen,
  theme,
  toggleLorD,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 100,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const [apps, setApps] = useState(appList);
  const [searchVal, setSearchVal] = useState("");
  const mouseY = useMotionValue(Infinity);
  const ishovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 6 + 12),
    [magnification, dockHeight],
  );

  const heightRow = useTransform(ishovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  let Folder;
  theme === "light" ? (Folder = "light") : (Folder = "dark");

  function handleSearchClick(value) {
    if (value === "") {
      setApps(appList);
      return null;
    }
    const filterBySearch = appList.filter((item) => {
      if (item.title.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
    });
    setApps(filterBySearch);
  }
  function handleClickAway(){
    setSearchVal("");
    
    ishovered.set(0);
  }

  return (
    <ClickAwayListener 
    onClickAway={()=>
        handleClickAway()
    }>
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="taskbarSearchOuter"
    >
      <motion.div
        className={`taskbarSearch-panel ${className}`}
        style={{ height: height }}
        role="Searchtoolbar"
        aria-label="Search dock"
      >
        <motion.div className="taskbar-search-resultList"
        onMouseMove={({ clientY }) => {
          mouseY.set(clientY);
        }}
        onMouseLeave={() => {
          mouseY.set(Infinity);
        }}
        >
          {searchVal.trim() !== ""
            ? apps.map((app) => {
                ishovered.set(1);
                return (
                  <SearchResultItem
                  
                    key={app.id}
                    onDoubleClick={() => handleAppOpen(app)}
                    className={app.title}
                    mouseY={mouseY}
                    spring={spring}
                    distance={distance}
                    magnification={magnification}
                    baseItemSize={baseItemSize}
                  >
                    <SearchResultIcon
                      style={{
                        backgroundImage: app.image
                          ? `url(/appIcons/${Folder + app.image})`
                          : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <SearchResultLabel>{app.title}</SearchResultLabel>
                  </SearchResultItem>
                );
              })
            : ishovered.set(0)}
        </motion.div>
        <input
          className="taskbar-search-input"
          role="search"
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => {
            const value = e.target.value;
            setSearchVal(value);
            handleSearchClick(value);
          }}
        ></input>
      </motion.div>
    </motion.div>
    </ClickAwayListener>
  );
}
