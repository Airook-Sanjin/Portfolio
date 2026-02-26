import logo from './logo.svg';
import './App.css';
import AppIcon from './components/app-icon';
import { useState } from 'react';


function App() {
  const [apps,setApps]= useState([{id: 1,title:"Calculator",x:40, y:40, image: null},
              {id: 2,title:"resume",x:40, y:140, image: null}]);

  const [dragging, setDragging] = useState(null);
  //  guide: dragging = {id,offestX,offsetY}
  const handleMouseDown=(e,id)=>{
    const app=apps.find((a) => a.id ===id);
    if(!app) return;

  setDragging({
    id,
    offsetX:e.clientX - app.x,
    offsetY:e.clientY - app.y
  });

  };
  const handleMouseMove=(e)=> {
    if(!dragging) return;

    setApps((prev)=>
      prev.map((app) =>
        app.id == dragging.id
          ?{
            ...app,
            x:e.clientX - dragging.offsetX,
            y:e.clientY - dragging.offsetY,

          }
          :app
        )
      );
  };

  const handleMouseUp=()=>{
    setDragging(null);
  };
  
  const HandleClick = (id,title) =>{
return console.log(`${title}  clicked`)
  };
  const moveCalc = () =>{
    setApps((prev) => 
      prev.map((app) =>
        app.id===2 ? {...app,x:app.x+20} : app))
  }
  return (
    <div className="App">
      <div className='Desktop'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
    {apps.map((app) =>(
      <AppIcon 
              key={app.id}
              appId = {app.id} 
              title={app.title} 
              onClick={HandleClick}
              x={app.x}
              y={app.y}
              onMouseDown = {(e) => handleMouseDown(e,app.id)}/>

    ))}
      
      </div>
      <div className ="Taskbar">

    </div>
    </div>

    
  );
}

export default App;
