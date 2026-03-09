import PropTypes from "prop-types";
import { Minus, X, Maximize} from "lucide-react";
import ProgramEmbed from "./app-program";



export default function Window(
  {
  
  color = "currentColor",
  className = "WindowContainer",
  title = "Window",
  image,
  onClick,
  windowId,
  appId,
  src,
  x = 0,
  y = 0,
  zIndex=0,
  startWindowDrag,
  handleCloseWindow,
  ...props
}
) {

  return (
    
  <div
  className={className}
  src={src}
  style={{ position: "absolute", left: x, top: y, userSelect: "none" }}
  {...props}
  >
    <header className="TitleBar"
            onMouseDown={(e)=>startWindowDrag(e,windowId)}>
      <img src={image} alt="icon" size = "1" />
      <p className="title">{title}</p>
      <div className="tools">
        <button className=" Btn Minimize" type="button"><Minus></Minus></button>
        <button className=" Btn Maximize" type="button"><Maximize></Maximize></button>
        <button className=" Btn Exit" onClick={()=> handleCloseWindow(windowId)} type="button"><X></X></button>
      </div>
      
    </header>
    
      <ProgramEmbed
      src={src}
      title={title}/>
    
  </div>
  );
}
Window.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  src:PropTypes.string,
};