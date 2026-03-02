import "./App.css";

import AppIcon from "./components/app-icon";
import Window from "./components/window-type";




import useIconDrag from "./hooks/useIconDrag";
import useWindowManager from "./hooks/useWindowManager";

function App() {
  
  const {apps,
    startAppDrag,
    appDrag,
    endAppDrag} = useIconDrag();

    const {openWindows,
      addOpenWindow,
      startWindowDrag,
      windowDrag,
      endWindowDrag
    } = useWindowManager();

    const handleDesktopMouseMove = (e)=>{
      appDrag(e);
      windowDrag(e);
    }

    const handleDesktopMouseEnd = ()=>{
      endAppDrag();
      endWindowDrag();
    }
  
  
 


  return (
    <div className="App">
      <div
        className="Desktop"
        onMouseMove={(e)=>handleDesktopMouseMove(e)}
        onMouseUp={handleDesktopMouseEnd}
        onMouseLeave={handleDesktopMouseEnd}
      >
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            appId={app.id}
            title={app.title}
            onDoubleClick={() => addOpenWindow(app)}
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
            x={window.x}
            y={window.y}
            zindex={window.zIndex}
            startWindowDrag={startWindowDrag}
          />
        ))}
      </div>
      <div className="Taskbar"></div>
     
    </div>
  );
}

export default App;
