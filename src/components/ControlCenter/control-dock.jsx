import "./controlDock.css"
import { useDate } from "./hooks/returnDate";

export default function ControlDock({
    time,
    theme,
    panelHeight=40,
    dockHeight = 256,
}){
    const height = dockHeight


    return(
        <div
        style={{height:dockHeight, scrollbarWidth:"none"}}
        className="ControlDockOuter">
            
            <div className="control-panel"
            style={{height:panelHeight}}
            role ="controlToolbar"
            aria-label = "Control dock">


            </div>
        </div>
    )
}