import {useRef, useEffect} from "react"
import { X, Minus, Square} from "lucide-react"
export default function TitleBar({ WindowRef,visibilityFun, removeFun, title} : {WindowRef: React.RefObject<HTMLDivElement | null>,visibilityFun: () => void, removeFun: () => void, title: string}) {

    const Dragging = useRef(false);
    // offset is distance between cursor and windows topleft corner without it the window would jump to place its corner under the cursor instead of staying where you grabbed it 
    const offset = useRef({ x: 0, y: 0 });
    const prevSize = useRef({ width: 0, height: 0 });

    // this adds eventlisteners after the dom is loaded if I put it in component of body it would run every time it rerendered 
    useEffect(() => {
        const handleMove = (e: MouseEvent) => Moving(e)
        const handleUp = (e: MouseEvent) => MouseUp(e)

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
        // when you delete the window it wont remove the event listener but if you add this function it will
        return () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
        }
    }, [])

    function MouseDown(e: React.MouseEvent){
        // this prevent you from grabbing just the text and then its just ANNOYUING
        e.preventDefault();
        Dragging.current = true;
        if (WindowRef.current){
            const element = WindowRef.current;
            const offsetX = e.clientX - element.offsetLeft;
            const offsetY = e.clientY - element.offsetTop;
            offset.current = { x: offsetX, y: offsetY };
            // console.log(prevSize.current.width, prevSize.current.height)
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
        // console.log(left);
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

        /* // I ditched this method cause when you went to side and then maximalized theres no way for you to make the window smaller maybe I will fix it in future
        if(e.clientY <= 20){
            prevSize.current = { width: element.offsetWidth, height: element.offsetHeight };
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = "100%";
            element.style.height = "100%";
        }*/
    }

    //excuse my spelling
    function maximalize(){
        if (!WindowRef.current) return;
        const element = WindowRef.current;
        if (element.style.width != "100%" && element.style.height != "100%"){
            prevSize.current = { width: element.offsetWidth, height: element.offsetHeight };
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = "100%";
            element.style.height = "100%"; 
        }
    }
    
    return (
        <div className="bg-gray-600 text-white h-6" onMouseDown={MouseDown}>
            <div className="flex">
                <h1 className="pl-2 ">{title}</h1>
                <div className="flex justify-end gap-3 p-1 grow">
                    <button onClick={visibilityFun} className="hover:bg-gray-500 cursor-pointer"><Minus size={18} /></button>
                    <button onClick={maximalize} className="hover:bg-gray-500 cursor-pointer"><Square size={18} /></button>
                    <button onClick={removeFun} className="hover:bg-gray-500 cursor-pointer"><X size={18} /></button>
                </div>
            </div>
        </div>
    )
}