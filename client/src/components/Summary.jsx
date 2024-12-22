import { useContext } from "react"
import { UserContext } from "./UserContext"

function Summary(){

    const { points } = useContext(UserContext)

    return(
        <div className="w-full h-1/5 text-2xl text-white text-center">
            Points: {Math.round(points * 100) / 100}
        </div>
    )
}

export default Summary