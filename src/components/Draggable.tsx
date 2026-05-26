import { useState, useRef, useEffect } from "react"
export default function Draggable({ children} : { children: React.ReactNode}) {
    const Dragging = useRef(false);
    const myRef = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        document.addEventListener("mousemove", (e) => Moving(e));
    }, [])

    function MouseDown(e: React.MouseEvent) {
        Dragging.current = true;
        if (myRef.current){
            const element = myRef.current;
            const offsetX = e.clientX - element.offsetLeft;
            const offsetY = e.clientY - element.offsetTop;
            offset.current = { x: offsetX, y: offsetY };
        }
    }

    //Math.min(Math.max(value, min), max)

    function Moving(e: MouseEvent){
        if(Dragging.current && myRef.current){
            const element = myRef.current;
            let left = e.clientX - offset.current.x;
            let top = e.clientY - offset.current.y;
            element.style.left = left + "px";
            element.style.top = top + "px";
        }
    }

    return (
        <div ref={myRef} className="absolute cursor-move bg-gray-400" onMouseDown={MouseDown} onMouseUp={() => Dragging.current = false}>
            { children}
        </div>
    )
}