import "./App.css";
// import AppIcon from "./components/AppIcons/app-icon";
import Desktop from "./components/desktop/Desktop";
import { OSProvider } from "./components/desktop/context/OSContext";

function App() {
  // localStorage.clear();

  


  return (
    <OSProvider>
      <Desktop/>
    </OSProvider>
  )
}

export default App;
