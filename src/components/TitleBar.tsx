import {useRef, useEffect} from "react"
export default function TitleBar(){

    const Dragging = useRef(false);
    const myRef = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        document.addEventListener("mousemove", (e) => Moving(e));
    }, [])


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
        <div className="bg-gray-600 text-black h-6">

        </div>
    )
}