import { useContext } from "react"
import { UserContext } from "./UserContext"

function ClickableObject(){

    const { points, setPoints, clickMultiplier } = useContext(UserContext)

    const handleClick = () => {
        setPoints(points + 1 * clickMultiplier)
    }

    return(
        <div className="w-1/2 h-1/2 bg-white" onClick={handleClick}>
        </div>
    )
}

export default ClickableObject