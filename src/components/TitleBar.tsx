import {useRef, useEffect} from "react"
export default function TitleBar({ WindowRef} : {WindowRef: React.RefObject<HTMLDivElement | null>}) {

    const Dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        document.addEventListener("mousemove", (e) => Moving(e));
    }, [])

    function MouseDown(e: React.MouseEvent){
        e.preventDefault();
        Dragging.current = true;
        if (WindowRef.current){
            const element = WindowRef.current;
            const offsetX = e.clientX - element.offsetLeft;
            const offsetY = e.clientY - element.offsetTop;
            offset.current = { x: offsetX, y: offsetY };
            console.log("Mouse Down", offset.current);
        }
    }

    function Moving(e: MouseEvent){
        if(Dragging.current && WindowRef.current){
            const element = WindowRef.current;
            let left = e.clientX - offset.current.x;
            let top = e.clientY - offset.current.y;
            element.style.left = left + "px";
            element.style.top = top + "px";
        }
    }
    
    return (
        <div className="bg-gray-600 text-white h-6 cursor-pointer" onMouseDown={MouseDown} onMouseUp={() => Dragging.current = false}>
            <div>TOPPBAR</div>
        </div>
    )
}