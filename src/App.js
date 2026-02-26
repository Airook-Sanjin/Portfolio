import logo from './logo.svg';
import './App.css';
import AppIcon from './components/app-icon';

function App() {
  return (
    <div className="App">
      <div className='Desktop'>

      <AppIcon title = "John"></AppIcon>
      <AppIcon image={"/ApplicationIcon.webp"}></AppIcon>
      </div>
      <div className ="Taskbar">

    </div>
    </div>

    
  );
}

export default App;
