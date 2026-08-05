

import { useOSContext } from "../context/OSContext";
export function useWindowManager(){
  const context = useOSContext();

  const {openWindows,
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
    endWindowResize,} = context;

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
  }
}