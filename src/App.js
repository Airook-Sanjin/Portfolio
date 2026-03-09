import "./App.css";

import AppIcon from "./components/app-icon";
import TaskbarIcon from "./components/taskbar-icon";
import Window from "./components/window-type";
import ProfileGreetings from "./components/profile-greeting"




import useIconDrag from "./hooks/useIconDrag";
import useTaskbarManager from "./hooks/useTaskbarManager";
import useWindowManager from "./hooks/useWindowManager";
import { useDate } from "./hooks/returnDate";

function App() {
  
  const {apps,
    startAppDrag,
    appDrag,
    endAppDrag} = useIconDrag();

    const {openWindows,
      addOpenWindow,
      startWindowDrag,
      windowDrag,
      endWindowDrag,
      closeOpenWindow} = useWindowManager();

    const{openTaskbar,
          closeOpenTaskbar,
          addOpenTaskbar} = useTaskbarManager()

    const handleDesktopMouseMove = (e)=>{
      appDrag(e);
      windowDrag(e);
    }

    const handleDesktopMouseEnd = ()=>{
      endAppDrag();
      endWindowDrag();
    }
    const handleAppOpen=(app)=>{
      addOpenWindow(app);
      addOpenTaskbar(app);
    }
    const handleCloseWindow=(windowId)=>{
      closeOpenWindow(windowId);
      closeOpenTaskbar(windowId)

    }
  
  
 


  return (
    <div className="App">
      <div
        className="Desktop"
        onMouseMove={(e)=>handleDesktopMouseMove(e)}
        onMouseUp={handleDesktopMouseEnd}
        onMouseLeave={handleDesktopMouseEnd}
      >
        <ProfileGreetings
        useDate = {useDate}/>
        
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

        {openWindows.map((window) => (
          <Window
            key={window.windowId}
            windowId={window.windowId}
            appId={window.appId}
            title={window.title}
            image={window.image}
            x={window.x}
            y={window.y}
            zindex={window.zIndex}
            src={window.src}
            
            startWindowDrag={startWindowDrag}
            handleCloseWindow={handleCloseWindow}

          />
        ))}
      </div>
      <div className="Taskbar">
        {openTaskbar.map((taskbar) => (
          <TaskbarIcon
            key={taskbar.taskbarID}
            taskbarID={taskbar.taskbarID}
            appId={taskbar.appId}
            windowId={taskbar.windowId}
            title={taskbar.title}
            image={taskbar.image}
            x={taskbar.x}
          />
        ))}
      </div>
     
    </div>
  );
}

export default App;
