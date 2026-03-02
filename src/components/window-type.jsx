import PropTypes from "prop-types";
import { Minus, X, Maximize} from "lucide-react";



export default function Window(
  {
  
  color = "currentColor",
  className = "WindowContainer",
  title = "Window",
  image = null,
  onClick,
  windowId,
  appId,
  x = 0,
  y = 0,
  zIndex=0,
  startWindowDrag,
  ...props
}
) {
  return (
    
  <window
  className={className}
  style={{ position: "absolute", left: x, top: y, userSelect: "none" }}
  {...props}
  >
    <header className="TitleBar"
            onMouseDown={(e)=>startWindowDrag(e,windowId)}>
      <img src={image} alt="icon" size = "4" />
      <p className="title">{title}</p>
      <div className="tools">
        <button className=" Btn Minimize" type="button"><Minus></Minus></button>
        <button className=" Btn Minimize" type="button"><Maximize></Maximize></button>
        <button className=" Btn Exit" type="button"><X></X></button>
      </div>
      
    </header>
    <program>
      <p>I am program</p>
    </program>

  </window>
  );
}
Window.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};