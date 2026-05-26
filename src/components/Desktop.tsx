import TaskBar from "./TaskBar";
export default function Desktop({ children} : { children: React.ReactNode}) {
    return (
        // I am using relative because now the children will be positioning by the dektop not by the entire page
        <div className="overflow-hidden relative h-screen w-screen bg-linear-to-r/srgb bg-[url('/RootBackground.png')] bg-cover">
            { children}
            <TaskBar><h1>TESTSTTSDSDTSDTTSDSDT</h1></TaskBar>
        </div>
    )
}