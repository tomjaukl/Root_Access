import {useState} from "react"
import Desktop from './components/Desktop'
import Window from './components/Window'
import TaskBar from "./components/TaskBar";

type windowType = {
  id: number;
  visible: boolean;
  title: string;
  icon: string;
}

export default function App() {
  const [windows, setWindows] = useState<windowType[]>([
    { id: 1, visible: true, title: "HackGame", icon: "/Icons/cmd.png" },
    { id: 2, visible: true, title: "web", icon: "/Icons/web.png" },
  ]);


  // I have to toggle the visibility in the windows[] 
  function toggleVisibility(id:number){
    console.log("visibility");
    setWindows(windows.map(w =>
      w.id === id ? { ...w, visible: !w.visible } : w
    ))
  }


  // This is bit funny cause its reverse filter (lmao)
  function removeWin(id:number){
    console.log("removed");
    setWindows(windows.filter(w =>
      w.id !== id
    ))
  }

  const [focusedWindow, setFocusedWindow] = useState<number | null>(null);
  return (
    <>
      <Desktop>
        {/* I HAVE SPENT SO MUCH TIME SEARCHING THE ISSUE WHAT I HAD HERE WITH NAMING THE ITERATOR VARIABLE JUST TO FIND OUT ITS BECAUSE I NAMED IT WINDOW WHICH IS GLOBAL OBJECT AND OFCOURSE IT DIDNT TELL ME ANYTHING NOR SHOWED ANY ERROR, UNDERSTANDABLE HAVE A GOOD DAY PITA */}
        {windows.map((win) => (
          <Window 
            key={win.id} 
            id={win.id} 
            focusedWindow={focusedWindow} 
            setFocusedWindow={setFocusedWindow}
            setVisibility={() => toggleVisibility(win.id)}
            visibilityBool={win.visible}
            removeFun={() => removeWin(win.id)}
          >
            <h1>{win.title}</h1>
          </Window>
        ))}
        <TaskBar>
          {windows.map((win) => (
            <button 
              key={win.id}
              className="cursor-pointer relative h-12 w-12 p-1 rounded hover:bg-gray-500"
              onClick={() => toggleVisibility(win.id)}
            >
              <img src={win.icon} alt={win.title}/>
            </button>
          ))}
        </TaskBar>
      </Desktop>
    </>
  )
}
