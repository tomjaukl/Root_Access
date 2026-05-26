import TitleBar from "./TitleBar";
import Draggable from "./Draggable";
import {useRef} from "react"
export default function Window({ children} : { children: React.ReactNode}) {
    
    const myRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={myRef} className="absolute w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col resize overflow-auto min-w-50 min-h-50">
            <TitleBar WindowRef={myRef} />
            { children }
        </div>
    )
}