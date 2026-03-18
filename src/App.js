import "./App.css";

import AppIcon from "./components/AppIcons/app-icon";
// import TaskbarIcon from "./components/taskbar-icon";
import Window from "./components/WindowCard/window-type";
import ProfileGreetings from "./components/Greeting/profile-greeting"
import Taskbar from "./components/Taskbar/taskbar";
import Loading from "./components/LoadingScreen/loading-screen";

import useIconDrag from "./hooks/useIconDrag";

import useWindowManager from "./hooks/useWindowManager";
import { useDate } from "./hooks/returnDate";
import { useState, useEffect } from "react";

function App() {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleLorD = () => {
    setThemeState((current) => (current === "light" ? "dark" : "light"));
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
            <ProfileGreetings useDate={useDate} />

            {apps.map((app) => (
              <AppIcon
                key={app.id}
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
                  handleCloseWindow={handleCloseWindow}
                  minimizeOpenWindow={minimizeOpenWindow}
                  expandOpenWindow={expandOpenWindow}
                />
              ))}
          </div>
          
          <Taskbar
            items={openWindows}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            restoreWindow={restoreWindow}
            toggleLorD={toggleLorD}
            theme={theme}
          > </Taskbar>
          
        </>
        
      )}
      
    </div>
  );
}

export default App;
