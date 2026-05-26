import Desktop from './components/Desktop'
import TaskBar from './components/TaskBar'
import Window from './components/Window'

export default function App() {
  return (
    <>
      <Desktop>
        <Window>
          <p className="text-black">Welcome to HackGame!</p>
        </Window>
      </Desktop>
    </>
  )
}
