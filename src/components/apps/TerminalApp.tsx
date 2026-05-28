import {useState, useRef,useEffect} from "react";

export default function TerminalApp({name,changeNameFun}:{name:string,changeNameFun: (name:string) => void}){
    

    // THIS IS ALL LINES IN CMD
    const [lines,setLines] = useState<Line[]>([
        {path:"C:/Users/Morpheus>",content:"The one who stinks here so much shall tell me your name"}
    ])

    useEffect(() =>{
        if(!terminalRef.current) return;
        terminalRef.current.focus();
    },[])
    
    const terminalRef = useRef<HTMLDivElement>(null);
    
    type Line = {
        path: string;
        content: string;
    }

    // THIS IS LINE WHAT USER IS TYPING
    const [currentLine,setCurrentLine] = useState("")

    // FOR NOW I JUST WANT TO MAKE USER BE ABLE TO INPUT THEIR NAME
    const [mode,setMode] = useState<"setup" | "command">("setup");


    let userPath = "C:/Users/"+name+">"
    
    //ctrl+k+i

    function writeln(path:string,content:string){
        const newLine = {path: path, content:content}
        setLines(prev => [...prev,newLine])
    }

    function OnEnter(){
        const userContent = currentLine;
        setLines(prev => [...prev,{path:userPath,content:userContent}])
        if(mode === "setup"){
                if(currentLine === ""){
                    writeln("C:/Users/morpheus","eh nice try but give me name or you will be kicked out (no joke)")
                } else{
                    changeNameFun(currentLine)
                    setMode("command")
                }
            }
            setCurrentLine("JUSTTESTING")
            setCurrentLine("");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>){
        console.log(e.key)
        if (e.key.length === 1){
            setCurrentLine(prev => prev+e.key)
        } else if (e.key === "Enter"){
            OnEnter();
        } else if (e.key === "Backspace"){
            setCurrentLine(prev => prev.slice(0,-1))
        }
    }
    return (
            <div ref={terminalRef} onFocus={() => console.log("Focused")} onBlur={() => console.log("Unfocused")} onKeyDown={handleKeyDown} tabIndex={0} className="whitespace-pre-wrap [&::-webkit-scrollbar]:hidden [scrollbar-width:none]  overflow-y-auto flex h-full flex-col outline-none text-wrap break-all bg-black text-green-400">
                {lines.map(((line,i) =>
                    <p key={i} className="pr-3">{line.path}{line.content}</p>
                ))}
                <p className="pr-3">{userPath}{currentLine}</p>
            </div>
    )
}