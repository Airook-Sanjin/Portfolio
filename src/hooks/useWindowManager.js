
import { useRef } from "react";
import { useState } from "react";


function useWindowManager(){
    let counterId = useRef(0);
    let topZ = useRef(1);
    const [openWindows, setOpenWindows] = useState([]);
      // guide: windowId,appId,Title,,x,y,zIndex
    
    
    
      const addOpenWindow = (app) => {
        const existingWindow = openWindows.find((w) => w.appId === app.id);
        if (!existingWindow) {
          counterId.current = counterId.current + 1;
          topZ.current = topZ.current + 1;
    
          setOpenWindows((prev) => [
            ...prev,
            {
              windowId: counterId.current,
              title: app.title,
              appId: app.id,
              x: 50,
              y: 50,
              zIndex: topZ.current,
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
                  }
                : foundWindow,
            ),
          );
        }
    }

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
    if (!dragging) return;

    setOpenWindows((prev) =>
      prev.map((window) =>
        window.windowId === dragging.id
          ? {
              ...window,
              x: e.clientX - dragging.offsetX,
              y: e.clientY - dragging.offsetY,
            }
          : window,
      ),
    );
  };

  const endWindowDrag = () => {
    setDragging(null);
  };


    return{
        openWindows,
        addOpenWindow,
        startWindowDrag,
        windowDrag,
        endWindowDrag,
    };
}
export default useWindowManager;