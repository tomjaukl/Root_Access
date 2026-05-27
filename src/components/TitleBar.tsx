import {useRef, useEffect} from "react"
import { X, Minus, Square} from "lucide-react"
export default function TitleBar({ WindowRef,visibilityFun, removeFun} : {WindowRef: React.RefObject<HTMLDivElement | null>,visibilityFun: () => void, removeFun: () => void}) {

    const Dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const prevSize = useRef({ width: 0, height: 0 });

    useEffect(() => {
        document.addEventListener("mousemove", (e) => Moving(e));
        document.addEventListener("mouseup", (e) => MouseUp(e));
    }, [])

    function MouseDown(e: React.MouseEvent){
        e.preventDefault();
        Dragging.current = true;
        if (WindowRef.current){
            const element = WindowRef.current;
            const offsetX = e.clientX - element.offsetLeft;
            const offsetY = e.clientY - element.offsetTop;
            offset.current = { x: offsetX, y: offsetY };
            console.log(prevSize.current.width, prevSize.current.height)
            if (element.style.height === "100%"){
                element.style.width = prevSize.current.width + "px";
                element.style.height = prevSize.current.height + "px";
                offset.current.x = prevSize.current.width / 2;
            }
        }
        
    }

    function Moving(e: MouseEvent){
        if(Dragging.current && WindowRef.current){
            const element = WindowRef.current;
            let left = e.clientX - offset.current.x;
            let top = e.clientY - offset.current.y;

            left = Math.min(Math.max(left,0),window.innerWidth-element.offsetWidth);
            top = Math.min(top,window.innerHeight - 48 - 24);
            top = Math.max(top,0);

            element.style.left = left + "px";
            element.style.top = top + "px";

        }
    }

    function MouseUp(e: MouseEvent){
        if (!Dragging.current || !WindowRef.current) return;
        Dragging.current = false;
        const element = WindowRef.current;
        let left = e.clientX;
        console.log(left);
        if (left <= 10){
            prevSize.current = { width: element.offsetWidth, height: element.offsetHeight };
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = "50%";
            element.style.height = "100%";
        }

        let right = window.innerWidth - e.clientX;
        if (right <= 10){
            prevSize.current = { width: element.offsetWidth, height: element.offsetHeight };
            element.style.left = "50%";
            element.style.top = "0";
            element.style.width = "50%";
            element.style.height = "100%";
        }
    }
    
    return (
        <div className="bg-gray-600 text-white h-6" onMouseDown={MouseDown}>
            <div className="flex">
                <h1 className="pl-2 ">name</h1>
                <div className="flex justify-end gap-3 p-1 grow">
                    <button onClick={visibilityFun} className="hover:bg-gray-500 cursor-pointer"><Minus size={18} /></button>
                    <button className="hover:bg-gray-500 cursor-pointer"><Square size={18} /></button>
                    <button onClick={removeFun} className="hover:bg-gray-500 cursor-pointer"><X size={18} /></button>
                </div>
            </div>
        </div>
    )
}