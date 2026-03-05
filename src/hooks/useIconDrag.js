import { useState } from "react";
function useIconDrag() {
  const [apps, setApps] = useState([
    {id: 1,title: "Calculator",x: 40,y: 40,image: null,type:"calculator", src:"https://airook-sanjin.github.io/AS_Calculator/"},

    {id: 2, title: "resume", x: 40, y: 140, image: null, type: "resume", src:"/ErickSanjuan - Resume2026.pdf" },
  ]);

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
