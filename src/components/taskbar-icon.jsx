import PropTypes from "prop-types";
import { File } from "lucide-react";

export default function TaskbarIcon({
    size = 40,
    color = "currentColor",
    className = "taskbarIconContainer",
    title = "Taskbar icon",
    image = null,
    taskbarID,
    appId,
    windowId,
    x = 0,
    ...props
}) { return(
<div
    className={className}
    image = {image}
    style={{ userSelect: "none" }}
   
    {...props}
>
    {image ? (
        <div
          className="TaskbarIconImage"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
            width: typeof size === "number" ? `${size}px` : size,
            height: typeof size === "number" ? `${size}px` : size,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <File className="TaskbarIconImage" size={size}></File>
      )}

</div>

)}
TaskbarIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};