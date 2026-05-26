import TitleBar from "./TitleBar";
import Draggable from "./Draggable";
export default function Window({ children} : { children: React.ReactNode}) {
    return (
        <Draggable>
        <div className="w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col">
            <TitleBar />
            { children }
        </div>
        </Draggable>
    )
}