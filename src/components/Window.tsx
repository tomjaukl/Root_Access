import TitleBar from "./TitleBar";
import {useRef} from "react"
export default function Window({ children, id, focusedWindow, setFocusedWindow, setVisibility, visibilityBool, removeFun,title } : 
                               { children: React.ReactNode, id: number, focusedWindow: number | null, setFocusedWindow: (id: number | null) => void, setVisibility : () => void,visibilityBool:boolean, removeFun : () => void,title:string }) {

    const myRef = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={myRef} className="absolute w-96 h-96 bg-white shadow-lg flex flex-col resize min-w-50 min-h-50" onMouseDown={() => setFocusedWindow(id)} style={{ zIndex: focusedWindow === id ? 1 : 0, display: visibilityBool ? "flex" : "none" }}>
            <TitleBar title={title} removeFun={removeFun} visibilityFun={setVisibility} WindowRef={myRef} />
            <div className="h-full">
                {children}
            </div>
        </div>
    )
}