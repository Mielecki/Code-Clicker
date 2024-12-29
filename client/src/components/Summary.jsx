import { useContext } from "react"
import { UserContext } from "./UserContext"
import Account from "./Account"

function Summary(){

    const { points, clickMultiplier, autoMultiplier } = useContext(UserContext)

    return(
        <div className="w-full h-max text-2xl text-white flex justify-between">
            <div>
                Points: {Math.round(points * 100) / 100}
                <br />
                Points per click: {Math.round(clickMultiplier * 100) / 100}
                <br />
                Points per second: {Math.round(autoMultiplier * 100) / 100}
            </div>
            <Account />
        </div>
    )
}

export default Summary