import "./settings.css"
import SelectionCard from "../../../Shared/SelectionCard/selection-card";
export default function settings({
    theme,
}) {
    let Folder;
    theme ==="light"? Folder= "light":Folder = "dark"
    return(
        <div className="SettingContainer">
            <div className="Header">
                <h3>Settings</h3>
            </div>
            <div className="setting-body">
                <SelectionCard className="SelectionCard"
                cardHeight={200}
                cardLength={500}
                title={"Wifi"}
                subtitle={"Mobile, WI-FI, hotspot"}/>
            </div>
        </div>
    );
}