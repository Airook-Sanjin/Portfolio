import "./controlDock.css";
import ProfileGreetings from "../Greeting/profile-greeting";

export default function ControlDock({
  theme,
  useDate,
  panelHeight = 40,
  dockHeight = 256,
}) {
  const { date, time, wish } = useDate();

  return (
    <div
      style={{ height: dockHeight, scrollbarWidth: "none" }}
      className="ControlDockOuter"
    >
      <div
        className="control-panel"
        style={{ height: panelHeight }}
        role="controlToolbar"
        aria-label="Control dock"
      >
        <div className="DateStatus">
          <div>{time}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}
