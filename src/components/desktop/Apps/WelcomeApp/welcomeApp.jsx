import "./welcomeApp.css"
export default function welcomeApp({
  theme,
}) {
  let Folder;
  theme==="light"? Folder = "light": Folder="dark"
  return (
    <div className="WindowAppContainer">
      <div className="Header">
        <h3>Nothing OS Installation</h3>
      </div>
      <div className="welcome-body">
        <div className="Icon"
          style={{
            backgroundImage:`url(/appIcons/${Folder}/start.svg)`,
            width: 150,
            height: 150,
            backgroundSize: "cover",
            backgroundPosition: "center",}} ></div>
        <div className="welcome-print">
        <h4 className="Welcome">Welcome to Nothing OS</h4>
        <p className="Info">
          Welcome to my portfolio based on NothingOS. There are a lot of features that you will love!
        </p>
        </div>
      </div>
      <div className="QuickStart">
        
      </div>
    </div>
  );
}
