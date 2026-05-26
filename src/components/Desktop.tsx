import TaskBar from "./TaskBar";
export default function Desktop({ children} : { children: React.ReactNode}) {
    return (
        // I am using relative because now the children will be positioning by the dektop not by the entire page
        <div className="overflow-hidden h-screen w-screen bg-linear-to-r/srgb from-green-400 to-green-800 relative">
            { children}
            <TaskBar><h1>TESTSTTSDSDTSDTTSDSDT</h1></TaskBar>
        </div>
    )
}