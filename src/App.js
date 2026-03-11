import "./App.css";

import AppIcon from "./components/app-icon";
import TaskbarIcon from "./components/taskbar-icon";
import Window from "./components/window-type";
import ProfileGreetings from "./components/profile-greeting";
import Loading from "./components/loading-screen";


import useIconDrag from "./hooks/useIconDrag";

import useWindowManager from "./hooks/useWindowManager";
import { useDate } from "./hooks/returnDate";
import { useState, useEffect } from "react";

function App() {
  const { apps, startAppDrag, appDrag, endAppDrag } = useIconDrag();

  const {
    openWindows,
    addOpenWindow,
    startWindowDrag,
    windowDrag,
    endWindowDrag,
    closeOpenWindow,
    minimizeOpenWindow,
    restoreWindow,
    expandOpenWindow,
  } = useWindowManager();

  

  const handleDesktopMouseMove = (e) => {
    appDrag(e);
    windowDrag(e);
  };

  const handleDesktopMouseEnd = () => {
    endAppDrag();
    endWindowDrag();
  };
  const handleAppOpen = (app) => {
    addOpenWindow(app);
    
  };
  const handleCloseWindow = (windowId) => {
    closeOpenWindow(windowId);
  };
 
  const[isLoading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);

    },5000);
  },[]);


  return (
    <div className="App">
      {isLoading ? (
        <Loading/>
      ) :
      (<>
        <div
        className="Desktop"
        onMouseMove={(e) => handleDesktopMouseMove(e)}
        onMouseUp={handleDesktopMouseEnd}
        onMouseLeave={handleDesktopMouseEnd}
      >

        <ProfileGreetings useDate={useDate} />

        {apps.map((app) => (
          <AppIcon
            key={app.id}
            appId={app.id}
            title={app.title}
            image={app.image}
            src={app.src}
            onDoubleClick={() => handleAppOpen(app)}
            x={app.x}
            y={app.y}
            onMouseDown={(e) => startAppDrag(e, app.id)}
          />
        ))}

        {openWindows
          .filter((window) => !window.isMinimized)
          .map((window) => (
            <Window
              key={window.windowId}
              windowId={window.windowId}
              appId={window.appId}
              title={window.title}
              image={window.image}
              x={window.x}
              y={window.y}
              width={window.width}
              height={window.height}
              zIndex={window.zIndex}
              src={window.src}
              startWindowDrag={startWindowDrag}
              handleCloseWindow={handleCloseWindow}
              minimizeOpenWindow={minimizeOpenWindow}
              expandOpenWindow={expandOpenWindow}
            />
          ))}
      </div>


      <div className="Taskbar">
        {openWindows.map((window) => (
          <TaskbarIcon
            appId={window.appId}
            windowId={window.windowId}
            title={window.title}
            image={window.image}
            restoreWindow={restoreWindow}
            
          />
        ))}

      </div>
        </>
      
      )}
      
    </div>
  );
}

export default App;
