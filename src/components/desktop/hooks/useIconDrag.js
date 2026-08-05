import { useState } from "react";
import useLocalStorageState from "./useLocaleStorage";
import { APP_REGISTRY } from "../../Shared/apps";
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

