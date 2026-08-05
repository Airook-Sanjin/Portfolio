import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import Window from "./WindowCard/window-type";
import ProfileGreetings from "./Greeting/profile-greeting";
import TaskbarApps from "./Taskbar/taskbar-apps";
import TaskbarSearch from "./Taskbar/SearchComponent/taskbar-search";
import StartMenu from "./Taskbar/StartMenuComponent/start-menu";
import Loading from "./LoadingComponents/loading-screen";
import ControlDock from "../ControlCenter/control-dock";

import { useDate } from "./hooks/returnDate";
import AppIcon from "../AppIcons/app-icon";
import { getIconImage } from "../../utils/icons";

import useLocalStorageState from "./hooks/useLocaleStorage";
import { useOSContext } from "./context/OSContext";


export default function Desktop() {
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
    apps,
    startAppDrag,
    appDrag,
    endAppDrag,
  } = useOSContext();


  const toggleLorD = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

//   const { apps, startAppDrag, appDrag, endAppDrag } = useIconDrag();

  
  const [theme, setTheme] = useLocalStorageState("theme", "light");

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const handleDesktopMouseMove = (e) => {
    appDrag(e);
    windowDrag(e);
    windowResize(e);
  };

  const handleDesktopMouseEnd = () => {
    endAppDrag();
    endWindowDrag();
    endWindowResize();
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

  return(
    <>
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
            <ControlDock panelHeight={40} useDate={useDate}></ControlDock>
            <ProfileGreetings useDate={useDate} />

            {apps.map((app) => (
              <AppIcon
                key={app.id}
                type={app.type}
                appId={app.id}
                title={app.title}
                image={getIconImage(app.id,theme)}
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
                <AnimatePresence>
                  <Window
                    key={window.windowId}
                    type={window.type}
                    theme={theme}
                    windowId={window.windowId}
                    appId={window.appId}
                    label={window.label}
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
                </AnimatePresence>
              ))}
          </div>
          <div className="Taskbar">
            {/* <StartMenu></StartMenu> */}

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
    </>
  )
}
