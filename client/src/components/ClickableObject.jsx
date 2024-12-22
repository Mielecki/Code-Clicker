import { useContext } from "react"
import { UserContext } from "./UserContext"
import terminal from "./assets/terminal.png"

function ClickableObject(){

    const { points, setPoints, clickMultiplier } = useContext(UserContext)

    const handleClick = () => {
        setPoints(points + 1 * clickMultiplier)
    }

    return(
        <div className="w-3/4 h-max">
            <img src={terminal} className="w-full h-auto" onClick={handleClick}  draggable="false"/>
        </div>
    )
}

export default ClickableObject