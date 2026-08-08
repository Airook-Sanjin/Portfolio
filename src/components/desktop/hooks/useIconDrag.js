


import { useOSContext } from "../context/OSContext";
export function useIconDrag() {
 
  const {
    apps,
    startAppDrag,
    appDrag,
    endAppDrag,
  }= useOSContext();

return {
    apps,
    startAppDrag,
    appDrag,
    endAppDrag,
  };
}

