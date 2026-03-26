import "./App.css";
import AppIcon from "./components/AppIcons/app-icon";

import Window from "./components/WindowCard/window-type";
import ProfileGreetings from "./components/Greeting/profile-greeting";
import TaskbarApps from "./components/Taskbar/taskbar-apps";
import TaskbarSearch from "./components/Taskbar/SearchComponent/taskbar-search";
import Loading from "./components/LoadingComponents/loading-screen";
import ControlDock from "./components/ControlCenter/control-dock";

import useIconDrag from "./hooks/useIconDrag";

import useWindowManager from "./hooks/useWindowManager";
import { useDate } from "./hooks/returnDate";
import { useState, useEffect } from "react";
import useLocalStorageState from "./hooks/useLocaleStorage";

function App() {
  

// localStorage.clear();

  
  const toggleLorD = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

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
    startWindowResize,
    windowResize,
    endWindowResize,
  } = useWindowManager();
  

  const [theme, setTheme] = useLocalStorageState("theme", "light");
  
  
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const handleDesktopMouseMove = (e) => {
    appDrag(e);
    windowDrag(e);
    windowResize(e)
  };

  const handleDesktopMouseEnd = () => {
    endAppDrag();
    endWindowDrag();
    endWindowResize()
  };
  const handleAppOpen = (app) => {
    addOpenWindow(app);
  };
  const handleCloseWindow = (windowId) => {
    closeOpenWindow(windowId);
  };

  const [isLoading, setLoading] = useState(() => {
    return localStorage.getItem("hasSeenLoading") !== "true";
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("hasSeenLoading", "true");
    }, 5000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="Desktop"
            onMouseMove={(e) => handleDesktopMouseMove(e)}
            onMouseUp={handleDesktopMouseEnd}
            onMouseLeave={handleDesktopMouseEnd}
          >
            <ControlDock
              panelHeight={30}
            >

              
            </ControlDock>
            <ProfileGreetings useDate={useDate} />

            {apps.map((app) => (
              <AppIcon
                key={app.id}
                type={app.type}
                theme={theme}
                appId={app.id}
                title={app.title}
                image={app.image}
                width={app.width}
                height={app.height}
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
                  type={window.type}
                  theme={theme}
                  windowId={window.windowId}
                  appId={window.appId}
                  label={window.label}
                  icon={window.icon}
                  x={window.x}
                  y={window.y}
                  width={window.width}
                  height={window.height}
                  zIndex={window.zIndex}
                  src={window.src}
                  startWindowDrag={startWindowDrag}
                  startWindowResize={startWindowResize}
                  handleCloseWindow={handleCloseWindow}
                  minimizeOpenWindow={minimizeOpenWindow}
                  expandOpenWindow={expandOpenWindow}
                />
              ))}
          </div>
          <div className="Taskbar">
            <TaskbarSearch
              appList={apps}
              handleAppOpen={handleAppOpen}
              panelHeight={68}
              baseItemSize={50}
              magnification={60}
              toggleLorD={toggleLorD}
              theme={theme}
            ></TaskbarSearch>

            <TaskbarApps
              items={openWindows}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
              restoreWindow={restoreWindow}
              toggleLorD={toggleLorD}
              theme={theme}
            ></TaskbarApps>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
