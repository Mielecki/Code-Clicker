import { useContext, useEffect, useState } from "react"
import UpgradeItem from "./UpgradeItem"
import { UserContext } from "./UserContext";

function Upgrades(){

    const { clickMultiplier, setClickMultiplier } = useContext(UserContext)

    const [ mouseQuant, setMouseQuant ] = useState(0);
    const [ mouseCost, setMouseCost ] = useState(10);

    const upgrades = [
        {
            key: 1,
            name: "Mouse",
            upgrades: [
                {
                    key: 1,
                    name: "U1",
                },
                {
                    key: 2,
                    name: "U2",
                }
            ],
            type: "click",
            multiplier: 0.1,
            baseCost: 10,
            cost: mouseCost,
            setCost: setMouseCost,
            quantity: mouseQuant,
            setQuant: setMouseQuant,
        }
    ]

    useEffect(() => {
        upgrades.forEach(item => {
            if (item.type == "click") {
                setClickMultiplier(1 + item.quantity*item.multiplier)
                item.setCost(item.baseCost * (item.quantity + 1) * 1/2)
            }
        });
    }, [mouseQuant])

    return(
        <div className="w-full h-4/5">
            {upgrades.map((item) => <UpgradeItem key={item.key} name={item.name} quantity={item.quantity} setQuant={setMouseQuant} cost={item.cost} upgrades={item.upgrades} />)}
        </div>
    )
}

export default Upgrades