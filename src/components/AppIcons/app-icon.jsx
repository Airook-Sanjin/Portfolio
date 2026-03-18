
import { File } from "lucide-react";
import PropTypes from "prop-types";
import "./appIcon.css"
// import NoImage from "./appIcons/ApplicationIcon.webp"

export default function AppIcon({
  size = 50,
  color = "currentColor",
  className = "AppIconContainer",
  title = "App icon",
  image ,
  onClick,
  appId,
  theme,
  x = 0,
  y = 0,
  ...props
}) {
  let Folder;
  theme==="light"? Folder = "light": Folder="dark"
  return (
    <div
      color="white"
      className={className}
      title={title}
      style={{ position: "absolute", left: x, top: y, userSelect: "none" }}
      onClick={onClick}
      {...props}
    >
      
        <div
          className="IconImage"
          style={{
            backgroundImage: image ? `url(/appIcons/${Folder + image})` : `url(/appIcons/ApplicationIcon.webp)`,
            width: typeof size === "number" ? `${size}px` : size,
            height: typeof size === "number" ? `${size}px` : size,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      

      <p className="IconLabel">{title}</p>
    </div>
  );
}

AppIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};
