import { useState, useEffect, useRef } from "react";

import "..//WindowCard/Window.css";
import useLocalStorageState from "./useLocaleStorage";

// !--------------------TEST------------------------

function useWindowManager() {
  let counterId = useRef(0);
  let topZ = useRef(1);

  const [openWindows, setOpenWindows] = useLocalStorageState("openWindows", []);
  // guide: windowId,appId,Title,,x,y,zIndex
  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  const addOpenWindow = (app) => {
    let width = app.width || Math.round(window.innerWidth * .6);
    let height = app.height ||Math.round(window.innerHeight * .5);
    const existingWindow = openWindows.find((w) => w.appId === app.id);
    if (!existingWindow) {
      counterId.current = counterId.current + 1;
      topZ.current = topZ.current + 1;

      setOpenWindows((prev) => [
        ...prev,
        {
          type: app.type,
          windowId: counterId.current,
          label: app.title,
          appId: app.id,
          src: app.src,
          width:width,
          height:height,
          minHeight: app.minHeight || 200,
          minWidth: app.minWidth || 200,
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
                width: window.innerHeight * 0.7,
                height: window.innerHeight * 0.5,
                isExpanded: false,
                x:window.innerWidth * .40,
                y:window.innerHeight * .25,
              }
            : {
                ...foundWindow,
                height : window.innerHeight,
                width: window.innerWidth * .995,
                x:0,
                y:0,
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
  const [resize, setResize] = useState(null);

  const startWindowResize = (e, id, side) => {
    console.log("RESIZE NS");
    const targetWindow = openWindows.find((w) => w.windowId === id);
    if (!targetWindow) return;

        setResize({
          side,
          id,
          startX:e.clientX,
          startY: e.clientY,
          startLeft:targetWindow.x,
          startTop: targetWindow.y,
          startRight: targetWindow.x +targetWindow.width,
          startBottom: targetWindow.y + targetWindow.height,
        });
        
    
  };

  const windowResize = (e) => {
    if (!resize) return;

    let {startX,startY,startLeft,startTop,startRight,startBottom,side} = resize;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY


    let left = startLeft;
    let top = startTop;
    let right = startRight;
    let bottom = startBottom;


    if(side.includes("N")) top = startTop + dy;
    if(side.includes("S")) bottom = startBottom + dy;
    if(side.includes("W")) left= startLeft + dx;
    if(side.includes("E")) right= startRight + dx;
    

    let width = right - left;
    let height = bottom - top;

    const target = openWindows.find(w => w.windowId === resize.id);
    if(!target) return;


    const minWidth = target.minWidth || 200;
    const minHeight = target.minHeight || 200;

    if(width<minWidth){
      if(side.includes("W")){
        left = right - minWidth;
      }else{
        right = left + minWidth;
      }
        width = minWidth;
        }

    if(height<minHeight){
      if(side.includes("N")){
        top=bottom - minHeight;
      }
      else{
        bottom = top + minHeight;
      }
          height=minHeight;
        }
    
    
    
        setOpenWindows((prev) =>
          prev.map((targetWindow) =>
            targetWindow.windowId === resize.id
              ? {
                  ...targetWindow,
                  x:left,
                  y:top,
                  width,
                  height,
                }
              : targetWindow, 
          ),
        );

  };
  const endWindowResize = () => {
    setResize(null);
  };

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
    const windowWidth = window.innerWidth * 0.5;
    const minX = -(windowWidth - (windowWidth - 200));
    const minY = 0;
    const maxY = window.innerHeight - (26 + 47);
    if (!dragging) return;
    const maxX = window.innerWidth - (windowWidth - 200);
    const newX = e.clientX - dragging.offsetX;
    const newY = e.clientY - dragging.offsetY;
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.windowId === dragging.id
          ? {
              ...window,

              x: clamp(newX, minX, maxX),
              y: clamp(newY, 0, maxY),
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
    startWindowResize,
    windowResize,
    endWindowResize,
  };
}
export default useWindowManager;
