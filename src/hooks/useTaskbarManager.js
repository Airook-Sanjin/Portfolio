import { useRef } from "react";
import { useState } from "react";

function useTaskbarManager(){
    let taskbarId = useRef(0);
    const [openTaskbar, setOpenTaskbar] = useState([]);
    // guide: TaskbarID, WindowId


    const addOpenTaskbar = (app) => {
        const existingTaskbar = openTaskbar.find((taskbar) => taskbar.appId === app.id);
        if(!existingTaskbar){
            taskbarId.current = taskbarId.current + 1;
            setOpenTaskbar((prev) => [
                ...prev,
                    {
                    taskbarID: taskbarId.current,
                    title: app.title,
                    appId: app.id,
                    x: 50,
                    },
                ]);
        }
    };

    const closeOpenTaskbar = (windowID) =>
        {
            setOpenTaskbar((prev) =>
            prev.filter(taskbar => taskbar.taskbarID !== windowID )
          )
        }
    return{
        openTaskbar,
        addOpenTaskbar,
        closeOpenTaskbar,
    };

}
export default useTaskbarManager;