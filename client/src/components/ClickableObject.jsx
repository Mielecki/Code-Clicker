import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import terminal from "./assets/terminal.png"
import { useRef } from "react"

function ClickableObject(){

    const { points, setPoints, clickMultiplier, autoMultiplier } = useContext(UserContext);

    const autoMultiplierRef = useRef(autoMultiplier);

    const [ code, setCode ] = useState([
        "", "", "", " ", " ", " ", " "
    ]);
    const prevPointsRef = useRef(points);
    useEffect(() => {
        const prevPoints = prevPointsRef.current;
        const characters = "abcdefghijklmnopqrstuvwxyz 0123456789";
        const n = characters.length;
        let result = "";
        
        for (let i = 0; i < Math.min((points - prevPoints), 40); i++) {
            result += characters.charAt(Math.floor(Math.random() * n));
        }
        const newCode = [ ...code ]
        if ((result.length + code[0].length) > 40) {
            for (let i = code.length - 1; i >= 1; i--) {
                newCode[i] = code[i-1];
            }
            newCode[0] = result; 
        } else {
            newCode[0] += result;
        }
        setCode(newCode);
        prevPointsRef.current = points;
    }, [points])

    const handleClick = () => {
        setPoints(p => p + 1 * clickMultiplier);
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
        <div className="w-3/4 h-max active:scale-105 grid" onClick={handleClick}>
            <img src={terminal} className="w-full h-auto col-start-1 col-end-1 row-start-1 row-end-1"  draggable="false"/>
            <div className="w-full h-auto col-start-1 col-end-1 row-start-1 row-end-1 flex flex-col justify-end text-green-500 font-bold text-[130%] ml-[2%] mb-[0.5%]">
                <div className="font-vt323 font-thin">{code[6]}</div>
                <div className="font-vt323 font-thin">{code[5]}</div>
                <div className="font-vt323 font-thin">{code[4]}</div>
                <div className="font-vt323 font-thin">{code[3]}</div>
                <div className="font-vt323 font-thin">{code[2]}</div>
                <div className="font-vt323 font-thin">{code[1]}</div>
                <div className="pl-[5%] font-vt323 font-thin">{code[0]}</div>
            </div>
        </div>
    )
}

export default ClickableObject