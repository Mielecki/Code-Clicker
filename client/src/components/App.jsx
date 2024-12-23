import { useState } from "react"
import { UserContext } from "./UserContext"
import Clicker from "./Clicker"
import Summary from "./Summary"
import Upgrades from "./Upgrades"

function App() {

    const [ user, setUser ] = useState("guest")
    const [ points, setPoints ] = useState(0)
    const [ clickMultiplier, setClickMultiplier ] = useState(1)

    return (
        <UserContext.Provider value={{ user, setUser, points, setPoints, clickMultiplier, setClickMultiplier }}>
            <div className="w-[100vw] h-[100vh] bg-slate-600 flex select-none">
                <Clicker />
                <div className="w-2/3 h-full p-5">
                    <Summary />
                    <Upgrades />
                </div>
            </div>
        </UserContext.Provider>
    )
}

export default App
