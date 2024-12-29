import { useContext, useState, useEffect } from "react"
import { UserContext } from "./UserContext"

function UpgradeItem({ name, quantity, cost, onUpgrade, icon, multiplier, type }){

    const { points } = useContext(UserContext);

    const [ position, setPosition ] = useState({ x: 0, y: 0});

    // variable to enable mouse tracking only when cursor is on an item, preventing all upgrade items from tracking the mouse 
    const [ track, setTrack ] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };
        
        if (track) window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [track]);
    
    const changeName = (name) => {
        if (name == name.toLowerCase()) return name;

        let result = "";
        
        for (let i = 0; i < name.length; i++) {
            if (name[i] == name[i].toLowerCase()) result += name[i];
            else result += " " + name[i].toLowerCase();
        }

        return result;
    }

    return(
        <>
        <div 
            className="w-full h-20 border-black border-2 bg-slate-500 rounded-md text-2xl flex gap-2 items-center justify-between px-2"
            onMouseEnter={()=> setTrack(true)}
            onMouseLeave={() => setTrack(false)}
        >
            <img src={icon} className="h-auto w-[64px]"/>
            <div className="flex-grow-[2] bg-slate-400 h-3/4 rounded-md flex items-center pl-2 flex-1">{changeName(name)}</div>
            <div className="flex-grow-[2] bg-slate-400 h-3/4 rounded-md flex items-center pl-2 flex-1">{quantity}</div>
            <div className="flex-grow-[2] bg-slate-400 h-3/4 rounded-md flex items-center pl-2 flex-1">{cost}</div>
            {cost > points 
            ?   <div className="h-full w-[64px] flex items-center">
                    <button className="bg-gray-600 h-3/4 w-full rounded-md">buy</button>
                </div>
            :   <div className="h-full w-[64px] flex items-center" onClick={onUpgrade}>
                    <button className="bg-green-600 h-3/4 w-full rounded-md">buy</button>
                </div>}
        </div>
        <div
            style={{
                display: track ? "block" : "none",
                top: position.y + 20,
                left: position.x,
            }}
            className="absolute bg-slate-500 rounded-md text-white p-1 border-black border-2 text-xl grid grid-cols-2"
        >
            <table className="border-spacing-x-3 border-separate">
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td>{type == "click" ? "click" : "idle"}</td>
                    </tr>
                    <tr>
                        <td>Per second</td>
                        <td>{multiplier}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default UpgradeItem