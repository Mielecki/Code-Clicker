import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import terminal from "./assets/terminal.png"
import { useRef } from "react"

function ClickableObject(){

    const { points, setPoints, clickMultiplier, autoMultiplier } = useContext(UserContext);

    const autoMultiplierRef = useRef(autoMultiplier);

    const handleClick = () => {
        setPoints(points + 1 * clickMultiplier);
    }

    useEffect(() => {
        autoMultiplierRef.current = autoMultiplier;
    }, [autoMultiplier]);

    useEffect(() => {
        const generateCode = () => {
            setPoints(p => p + autoMultiplierRef.current);
        }

        const intervalId = setInterval(generateCode, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <div className="w-3/4 h-max">
            <img src={terminal} className="w-full h-auto" onClick={handleClick}  draggable="false"/>
        </div>
    )
}

export default ClickableObject