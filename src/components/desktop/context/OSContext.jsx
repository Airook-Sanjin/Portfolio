

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import useLocalStorageState from "../hooks/useLocaleStorage";
import { APP_REGISTRY } from "../../Shared/apps";

const initialFileSystem= [
  {id:'this PC',
    name:'This PC',
    type:"folder",
    parentId: null,
    createdAt: Date.now(),
    updatedAt:Date.now(),
  },
  {id:'documents',
    name:'Documents',
    type:"folder",
    parentId: "this pc",
    createdAt: Date.now(),
    updatedAt:Date.now(),
  },
  {id:'photos',
    name:'Photos',
    type:"folder",
    parentId: "this pc",
    createdAt: Date.now(),
    updatedAt:Date.now(),
  },
  {id:'downloads',
    name:'Downloads',
    type:"folder",
    parentId: "this pc",
    createdAt: Date.now(),
    updatedAt:Date.now(),
  },
];

//* File System Manager  
// TODO:
//  - [x] UI


function useFileSystemManagerInternal(){

  
  const [fileSystem, setFileSystem] = useLocalStorageState("fileSystem", initialFileSystem);
  const [recycleBin, setRecycleBin] = useLocalStorageState('recycleBin',[]);


  const findItem = (items, id) => {items.find(item => item.id === id)};
  const generateID = () => Date.now() + "-" + Math.random().toString(36).slice(2,9);
  const getChildren = (items, parentId) =>{items.filter(item => item.parent === parentId )}
  const getPath = (items,id) => { 
    const path = [];
    let current = getItem(items,id);
    while(current){
      path.unshift(current);
      current = findItem(items,parentId);
    }
    return path;
  
  }


  const createItem = useCallback((name, type, parent = "root", content = '') => {
    const newItem = {
      id: generateID(),
      name,
      type,
      parent,
      content: type ==="file"? content: undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setFileSystem(prev => [...prev,newItem]);

    return newItem;
  },[] );


const deleteItem = useCallback((id) => {
  const getDescendants = (items,parentId) => {
    const children = items.filter(item => item.parentId === parentId);
    let descendants = [...children];
    children.foreach(child => {
      descendants = [...descendants,...getDescendants(items,child.id)];
    });
    return descendants
  };

  setFileSystem(prev => {
    const item = findItem(prev, id);
    if (!item) return prev;
    const descendants = getDescendants(id);
    const itemsToDelete = [item,...descendants];
    const remaining = prev.filter(i => !itemsToDelete.includes(i));

    const deletedItems = itemsToDelete.map(i => ({
      ...i,
      deletedAt: Date.now(),

    }));
    setRecycleBin(prevBin => [...prevBin, deleteItems]);

    return remaining;

});
},[]);

const renameItem = useCallback((newName,id) => {
  setFileSystem(prev=>{
    prev.map(item.id === id ? 
      {...item,
          name:newName,
        updatedAt:Date.now()} : item)

  })
},[])


const moveItem = useCallback((id,newParentId) => {
  const isDescendant = (items, targetId,potentialParentId) => {
    let current = items.find(item => item.id === potentialParentId);
    while(current){
      if(current.id === targetId) return true;
      current = items.find(item => item.id === current.parentId);
    }
    return false;
  };

  setFileSystem(prev => {
    if(isDescendant(prev,id,newParentId)) return prev;
    prev.map(item => item.id ===id ? {...item,
      parentId: newParentId,
      updatedAt:Date.now(),
    } : item)
  })
},[])


const restoreItem = useCallback((id) =>{
  const binItem = recycleBin.find(item => item.id === id);
  if(!binItem) return;
  setRecycleBin(prev => prev.filter(item => item.id != id));
  const {deletedAt,...restored} = binItems;

  setFileSystem(prev => [...prev, restored]);
},[recycleBin])

const permaDelete = useCallback((id) => {
  setRecycleBin(prev => prev.filter(item => item.id != id));
},[])


const getFolderChildren = useCallback((folderId) =>{
  return fileSystem.filter(Children => children.filter(child => child.parentId === folderId))
},[fileSystem])

return {
  fileSystem,
  recycleBin,
  createItem,
  deleteItem,
  renameItem,
  moveItem,
  restoreItem,
  permaDelete,
  getFolderChildren,
};

}




// * Window Manager
function useWindowManagerInternal() {
  let counterId = useRef(0);
  let topZ = useRef(1);

  const [openWindows, setOpenWindows] = useLocalStorageState("openWindows", []);
  // guide: windowId,appId,Title,,x,y,zIndex
  const clamp = useCallback((value, min, max) => {
    return Math.min(max, Math.max(min, value));
  }, []);

  const addOpenWindow = useCallback((app) => {
    setOpenWindows((prev) => {
      let width = app.width || Math.round(window.innerWidth * 0.6);
      let height = app.height || Math.round(window.innerHeight * 0.5);
      const existingWindow = prev.find((w) => w.appId === app.id);

      if (!existingWindow) {
        counterId.current = counterId.current + 1;
        topZ.current = topZ.current + 1;

        return [
          ...prev,
          {
            type: app.type,
            windowId: counterId.current,
            label: app.title,
            appId: app.id,
            src: app.src,
            width: width,
            height: height,
            minHeight: app.minHeight || 200,
            minWidth: app.minWidth || 200,
            x: 50,
            y: 50,
            zIndex: topZ.current,
            isMinimized: false,
            isExpanded: false,
          },
        ];
      } else {
        topZ.current = topZ.current + 1;
        return prev.map((foundWindow) =>
          foundWindow.appId === app.id
            ? {
                ...foundWindow,
                zIndex: topZ.current,
                isMinimized: false,
              }
            : foundWindow,
        );
      }
    });
  }, []);

  const closeOpenWindow = useCallback((windowID) => {
    setOpenWindows((prev) =>
      prev.filter((window) => window.windowId !== windowID),
    );
  }, []);

  const minimizeOpenWindow = useCallback((windowID) => {
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
  }, []);

  const expandOpenWindow = useCallback((windowID) => {
    setOpenWindows((prev) =>
      prev.map((foundWindow) =>
        foundWindow.windowId === windowID
          ? foundWindow.isExpanded
            ? {
                ...foundWindow,
                width: window.innerHeight * 0.7,
                height: window.innerHeight * 0.5,
                isExpanded: false,
                x: window.innerWidth * 0.4,
                y: window.innerHeight * 0.25,
              }
            : {
                ...foundWindow,
                height: window.innerHeight,
                width: window.innerWidth * 0.995,
                x: 0,
                y: 0,
                isExpanded: true,
              }
          : foundWindow,
      ),
    );
  }, []);

  const restoreWindow = useCallback((windowId) => {
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
  }, []);

  //  Dragging functionality------------
  const [dragging, setDragging] = useState(null);
  //  guide: dragging = {id,offestX,offsetY}
  const [resize, setResize] = useState(null);

  const startWindowResize = useCallback((e, id, side) => {
    console.log("RESIZE NS");
    setOpenWindows((prev) => {
      const targetWindow = prev.find((w) => w.windowId === id);
      if (!targetWindow) return prev;

      setResize({
        side,
        id,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: targetWindow.x,
        startTop: targetWindow.y,
        startRight: targetWindow.x + targetWindow.width,
        startBottom: targetWindow.y + targetWindow.height,
      });
      return prev;
    });
  }, []);

  const windowResize = useCallback(
    (e) => {
      if (!resize) return;

      let {
        startX,
        startY,
        startLeft,
        startTop,
        startRight,
        startBottom,
        side,
      } = resize;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let left = startLeft;
      let top = startTop;
      let right = startRight;
      let bottom = startBottom;

      if (side.includes("N")) top = startTop + dy;
      if (side.includes("S")) bottom = startBottom + dy;
      if (side.includes("W")) left = startLeft + dx;
      if (side.includes("E")) right = startRight + dx;

      let width = right - left;
      let height = bottom - top;
      setOpenWindows((prev) => {
        const target = prev.find((w) => w.windowId === resize.id);
        if (!target) return prev;

        const minWidth = target.minWidth || 200;
        const minHeight = target.minHeight || 200;

        // * Clamp Width
        if (width < minWidth) {
          if (side.includes("W")) {
            left = right - minWidth;
          } else {
            right = left + minWidth;
          }
          width = minWidth;
        }

        //* Clamp Height
        if (height < minHeight) {
          if (side.includes("N")) {
            top = bottom - minHeight;
          } else {
            bottom = top + minHeight;
          }
          height = minHeight;
        }

        return prev.map((targetWindow) =>
          targetWindow.windowId === resize.id
            ? {
                ...targetWindow,
                x: left,
                y: top,
                width,
                height,
              }
            : targetWindow,
        );
      });
    },
    [resize],
  );

  const endWindowResize = useCallback(() => {
    setResize(null);
  }, []);

  const startWindowDrag = useCallback((e, id) => {
    setOpenWindows((prev) => {
      const window = prev.find((w) => w.windowId === id);
      if (!window) return prev;

      setDragging({
        id,
        offsetX: e.clientX - window.x,
        offsetY: e.clientY - window.y,
      });
      return prev;
    });
  }, []);

  const windowDrag = useCallback(
    (e) => {
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
    },
    [dragging, clamp],
  );

  const endWindowDrag = useCallback(() => {
    setDragging(null);
  }, []);

  return {
    openWindows,
    addOpenWindow,
    closeOpenWindow,
    minimizeOpenWindow,
    expandOpenWindow,
    restoreWindow,
    startWindowDrag,
    windowDrag,
    endWindowDrag,
    startWindowResize,
    windowResize,
    endWindowResize,
  };
}
// *-------------------------

function useIconDragInternal() {
  const [apps, setApps] = useLocalStorageState(
    "desktopIcons",
    APP_REGISTRY.map((app, index) => ({
      ...app,
      x: 40 + (index % 3) * 120,
      y: 40 + Math.floor(index / 3) * 120,
    })),
  );

  const [dragging, setDragging] = useState(null);
  //  guide: dragging = {id,offestX,offsetY}

  const startAppDrag = (e, id) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;

    setDragging({
      id,
      offsetX: e.clientX - app.x,
      offsetY: e.clientY - app.y,
    });
  };

  const appDrag = (e) => {
    if (!dragging) return;

    setApps((prev) =>
      prev.map((app) =>
        app.id === dragging.id
          ? {
              ...app,
              x: e.clientX - dragging.offsetX,
              y: e.clientY - dragging.offsetY,
            }
          : app,
      ),
    );
  };

  const endAppDrag = () => {
    setDragging(null);
  };

  return {
    apps,
    startAppDrag,
    appDrag,
    endAppDrag,
  };
}


const OSContext = createContext(null);

export function OSProvider({ children }) {
  const WindowManager = useWindowManagerInternal();
  const IconManager = useIconDragInternal();
  const fileManager = useFileSystemManagerInternal();

  const value = {
    ...WindowManager,
    ...IconManager,
    ...fileManager
  };
  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOSContext() {
  const value = useContext(OSContext);
  if (!value) {
    throw new Error("useOSContext MUST be used WITHIN OSProvider");
  }
  return value;
}
