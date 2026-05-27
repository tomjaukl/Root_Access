export default function TaskBar({children} : { children: React.ReactNode }) {
    return (
        <div className="absolute z-10 bottom-0 left-0 w-screen h-12 self-end bg-gray-800 flex items-center justify-center gap-4 text-white">
            { children}
        </div>
    )
}