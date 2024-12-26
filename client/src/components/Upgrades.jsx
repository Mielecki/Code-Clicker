import { useContext, useEffect, useState } from "react"
import UpgradeItem from "./UpgradeItem"
import { UserContext } from "./UserContext";
import keyboard from "./assets/keyboard.png"

const upgradeData = {
    keyboard: {
        name: "keyboard",
        type: "click",
        icon: keyboard,
        multiplier: 0.1,
        baseCost: 10,
        cost: 5,
        quantity: 0,
    },
}

function Upgrades(){

    const { setClickMultiplier } = useContext(UserContext);
    const { points, setPoints } = useContext(UserContext)


    const [ upgrades, setUpgrades ] = useState(upgradeData);

    const handleUpgrade = (key) => {
        const newUpgrades = { ...upgrades };
        const upgrade = newUpgrades[key];
        if (upgrade.cost > points) return;
        upgrade.quantity += 1;

        setPoints(points - upgrade.cost)
        upgrade.cost = upgrade.baseCost * (upgrade.quantity + 1) * 0.5;
        setUpgrades(newUpgrades);
    }

    useEffect(() => {
        let newClickMultiplier = 1;
        Object.values(upgrades).forEach(item => {
            if (item.type == "click") {
                newClickMultiplier += item.quantity * item.multiplier;
            }
        });
        setClickMultiplier(newClickMultiplier);
    }, [upgrades]);

    return(
        <div className="w-full h-max">
            <div className="w-full h-10 border-black border-2 bg-slate-500 rounded-md text-2xl flex gap-2 items-center justify-between px-2 text-center">
                <span className="w-[64px]"></span>
                <span className="flex-grow-[2] flex-1">name</span>
                <span className="flex-grow-[2] flex-1">quantity</span>
                <span className="flex-grow-[2] flex-1">cost</span>
                <span className="w-[64px]"></span>
            </div>
            {Object.keys(upgrades).map((key) => {
                const upgrade = upgrades[key];
                return <UpgradeItem key={key} name={upgrade.name} quantity={upgrade.quantity} cost={upgrade.cost} icon={upgrade.icon} onUpgrade={() => handleUpgrade(key)}/>
            })}
        </div>
    )
}

export default Upgrades