import { ScanFace } from "lucide-react";
import { File } from "lucide-react";
import PropTypes from "prop-types";

export default function AppIcon({
  size = 50,
  color = "currentColor",
  className = "AppIconContainer",
  title = "App icon",
  image = null,
  ...props
}) {
  return (
    <div
    color="white"
    className={className} 
    title = {title}
    {...props}>

      {image ? (<div
        className="IconImage"
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />) :(<File className="IconImage" size={size}></File>)}
      

    <p className = "IconLabel">{title}</p>
    </div>
  );
}

AppIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};
