import {useState} from "react";
import Desktop from './components/Desktop';
import Window from './components/Window';
import TaskBar from "./components/TaskBar";
import TerminalApp from "./components/apps/TerminalApp";
import WebApp from "./components/apps/WebApp";

type app = "terminal" | "web" | "hackgame"


// I have to refactor what is for me APP and what is for me WINDOW cause right now its all mixed up together and its starting to smell bad - DONE
// In future I would create the actual apps and not hard coding them into the array so like Terminal and then when you click on it, it adds on the desktop and you can normally work with it because everything will have id
// you will be able to have multiple windows of same type 
// WE (ME) HAVE TO CREATE REGISTRY 

// Now how are we going to save data about the user 

type appType = {
  id: number;
  title: string;
  icon: string;
  app: app;
}

const APPS: appType[] =[
  { id: 1, title: "HackGame", icon: "/Icons/cmd.png",app:"terminal"},
  { id: 2, title: "web", icon: "/Icons/web.png",app:"web"}
]

type runningApp = {
  app: appType;
  visible: boolean;
  open: boolean;
}


export default function App() {

  const [openWindows,setOpenWindows] = useState<runningApp[]>([
    {app:APPS[0],visible:true,open:true},
    {app:APPS[1],visible:true,open:true}
  ])




  // I have to toggle the visibility in the windows[] 
  // prev state guarantee that it has the most uptodate value when it runs for my game its overkill but its a good habit for the future
  function toggleVisibility(id:number){
    setOpenWindows(prev =>
    prev.map(w =>
      w.app.id === id ? { ...w, visible: !w.visible } : w)
    );
  }


  // This is bit funny cause its reverse filter (lmao)
  function removeWin(id:number){
    setOpenWindows(prev =>
    prev.filter(w => 
      w.app.id !== id)
    );
  }

  // Now I need function what will either show or hide the app or turn on the app depending on if its in the list or not 
  function openOrToggle(id:number){
    const exists = openWindows.find(w => w.app.id === id)
    if(exists){
      setOpenWindows(prev =>
      prev.map(w =>
        w.app.id === id?{...w,visible: !w.visible}:w)
      );
    } else{
      const appToOpen = APPS.find(a => a.id === id)
      if(appToOpen){
        setOpenWindows(prev => [...prev,{app:appToOpen,visible:true,open:true}])
      }
    }
  }

  type user = {
    nickname: string;
  }

  const [player, setPlayer] = useState<user>({nickname: "guest"});

  function changeName(name:string){
    setPlayer({nickname:name})
  }

  

  const [focusedWindow, setFocusedWindow] = useState<number | null>(null);
  return (
    <>
      <Desktop>
        {/* I HAVE SPENT SO MUCH TIME SEARCHING THE ISSUE WHAT I HAD HERE WITH NAMING THE ITERATOR VARIABLE JUST TO FIND OUT ITS BECAUSE I NAMED IT WINDOW WHICH IS GLOBAL OBJECT AND OFCOURSE IT DIDNT TELL ME ANYTHING NOR SHOWED ANY ERROR, UNDERSTANDABLE HAVE A GOOD DAY PITA */}
        {openWindows.map((win) => (
          <Window 
            key={win.app.id} 
            id={win.app.id} 
            focusedWindow={focusedWindow} 
            setFocusedWindow={setFocusedWindow}
            setVisibility={() => toggleVisibility(win.app.id)}
            visibilityBool={win.visible}
            removeFun={() => removeWin(win.app.id)}
            title={win.app.title}
          >
            {win.app.app === "terminal" && <TerminalApp changeNameFun={(name: string) => changeName(name)} name={player.nickname}/>}
            {win.app.app === "web" && <WebApp/>}
          </Window>
        ))}
        <TaskBar>
          {APPS.map((win) => (
            <button 
              key={win.id}
              className="cursor-pointer relative h-12 w-12 p-1 rounded hover:bg-gray-500"
              onClick={() => openOrToggle(win.id)}
            >
              <img src={win.icon} alt={win.title}/>
            </button>
          ))}
        </TaskBar>
      </Desktop>
    </>
  )
}
