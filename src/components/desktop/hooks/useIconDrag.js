import { useState } from "react";
import { APP_REGISTRY } from "../../Shared/apps";
function useIconDrag() {
  const [apps, setApps] = useState(APP_REGISTRY);

  const [dragging, setDragging] = useState(null);
  //  guide: dragging = {id,offestX,offsetY}

  const startAppDrag = (e, id) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;

    setDragging({
      id,
      offsetX: e.clientX - app.x,
      offsetY: e.clientY - app.y,
    });
  };

  const appDrag = (e) => {
    if (!dragging) return;

    setApps((prev) =>
      prev.map((app) =>
        app.id === dragging.id
          ? {
              ...app,
              x: e.clientX - dragging.offsetX,
              y: e.clientY - dragging.offsetY,
            }
          : app,
      ),
    );
  };

  const endAppDrag = () => {
    setDragging(null);
  };

  return {
    apps,
    startAppDrag,
    appDrag,
    endAppDrag,
  };
}
export default useIconDrag;
