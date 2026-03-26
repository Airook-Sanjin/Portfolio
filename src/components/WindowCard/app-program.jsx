import PropTypes from "prop-types";

export default function ProgramEmbed({
  src,
  className = "Program",
  title = "Program",
  appId,
  ...props
}) {
  return (
    <iframe className={className} src={src} title={`${title} App`} {...props} />
  );
}
ProgramEmbed.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  src: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};
