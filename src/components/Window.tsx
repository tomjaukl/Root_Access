import TitleBar from "./TitleBar";
import {useRef} from "react"
export default function Window({ children, id, focusedWindow, setFocusedWindow, setVisibility, visibilityBool, removeFun } : { children: React.ReactNode, id: number, focusedWindow: number | null, setFocusedWindow: (id: number | null) => void, setVisibility : () => void,visibilityBool:boolean, removeFun : () => void }) {
    
    const myRef = useRef<HTMLDivElement>(null);

    // I had to move the visibility up so I could control it from taskbar 
    let isVisible = setVisibility;

    // dunno why but function like this just seems unholy to be made
    console.log(visibilityBool)

    return (
        <div ref={myRef} className="absolute w-96 h-96 bg-white shadow-lg flex flex-col resize overflow-auto min-w-50 min-h-50" onMouseDown={() => setFocusedWindow(id)} style={{ zIndex: focusedWindow === id ? 1 : 0, display: visibilityBool ? "flex" : "none" }}>
            <TitleBar removeFun={removeFun} visibilityFun={setVisibility} WindowRef={myRef} />
            { children }
        </div>
    )
}