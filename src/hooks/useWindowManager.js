
import { useState,useEffect,useRef } from "react";

import "../components/WindowCard/PixelCard.css";








// !--------------------TEST------------------------

function useWindowManager() {
  let counterId = useRef(0);
  let topZ = useRef(1);
  const [openWindows, setOpenWindows] = useState([]);
  // guide: windowId,appId,Title,,x,y,zIndex
  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  const addOpenWindow = (app) => {
    const existingWindow = openWindows.find((w) => w.appId === app.id);
    if (!existingWindow) {
      counterId.current = counterId.current + 1;
      topZ.current = topZ.current + 1;

      setOpenWindows((prev) => [
        ...prev,
        {
          windowId: counterId.current,
          label: app.title,
          appId: app.id,
          icon: app.image,
          src: app.src,
          width:app.width,
          x: 50,
          y: 50,
          zIndex: topZ.current,
          isMinimized: false,
          isExpanded: false,
        },
      ]);
    } else {
      topZ.current = topZ.current + 1;
      setOpenWindows((prev) =>
        prev.map((foundWindow) =>
          foundWindow.appId === app.id
            ? {
                ...foundWindow,
                zIndex: topZ.current,
                isMinimized: false,
              }
            : foundWindow,
        ),
      );
    }
  };

  const closeOpenWindow = (windowID) => {
    setOpenWindows((prev) =>
      prev.filter((window) => window.windowId !== windowID),
    );
  };

  const minimizeOpenWindow = (windowID) => {
    setOpenWindows((prev) =>
      prev.map((foundWindow) =>
        foundWindow.windowId === windowID
          ? {
              ...foundWindow,
              isMinimized: true,
            }
          : foundWindow,
      ),
    );
  };

  const expandOpenWindow = (windowID) => {
    setOpenWindows((prev) =>
      prev.map((foundWindow) =>
        foundWindow.windowId === windowID
          ? foundWindow.isExpanded
            ? {
                ...foundWindow,
                width: "50vw",
                height: "60vh",
                isExpanded: false,
              }
            : {
                ...foundWindow,
                width: "100%",
                height: "100%",
                x: 0,
                y: 0,
                isExpanded: true,
              }
          : foundWindow,
      ),
    );
  };

  const restoreWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((foundWindow) =>
        foundWindow.windowId === windowId
          ? foundWindow.isMinimized
            ? {
                ...foundWindow,
                isMinimized: false,
              }
            : {
                ...foundWindow,
                isMinimized: true,
              }
          : foundWindow,
      ),
    );
  };

  //  Dragging functionality------------
  const [dragging, setDragging] = useState(null);
  //  guide: dragging = {id,offestX,offsetY}

  const startWindowDrag = (e, id) => {
    const window = openWindows.find((w) => w.windowId === id);
    if (!window) return;

    setDragging({
      id,
      offsetX: e.clientX - window.x,
      offsetY: e.clientY - window.y,
    });
  };

  const windowDrag = (e) => {
    const windowWidth = window.innerWidth * 0.5
    const minX= -(windowWidth - (windowWidth-200));
    const minY=0;
    const maxY = window.innerHeight - (26+47)
    if (!dragging) return;
    const maxX = window.innerWidth - (windowWidth-200);
    const newX = e.clientX-dragging.offsetX;
    const newY = e.clientY-dragging.offsetY;
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.windowId === dragging.id
          ? {
              ...window,
              
              x: clamp(newX,minX,maxX),
              y: clamp(newY,0,maxY),
            }
          : window,
      ),
    );
  };

  const endWindowDrag = () => {
    setDragging(null);
  };

  return {
    openWindows,
    addOpenWindow,
    startWindowDrag,
    windowDrag,
    endWindowDrag,
    closeOpenWindow,
    minimizeOpenWindow,
    restoreWindow,
    expandOpenWindow,
  };
}
export default useWindowManager;
