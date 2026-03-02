
import { File } from "lucide-react";
import PropTypes from "prop-types";

export default function AppIcon({
  size = 50,
  color = "currentColor",
  className = "AppIconContainer",
  title = "App icon",
  image = null,
  onClick,
  appId,
  x = 0,
  y = 0,
  ...props
}) {
  return (
    <div
      color="white"
      className={className}
      title={title}
      style={{ position: "absolute", left: x, top: y, userSelect: "none" }}
      onClick={onClick}
      {...props}
    >
      {image ? (
        <div
          className="IconImage"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
            width: typeof size === "number" ? `${size}px` : size,
            height: typeof size === "number" ? `${size}px` : size,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <File className="IconImage" size={size}></File>
      )}

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
