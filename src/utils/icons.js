import { Icons } from "../components/Shared/icons";

export const getIconImage = (appId, currentTheme) => {
  return currentTheme === `light` ? Icons[`${appId}`] : Icons[`${appId}_dark`];
};
