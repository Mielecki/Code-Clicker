import { useContext } from "react"
import UpgradeItemUpgrade from "./UpgradeItemUpgrade"
import { UserContext } from "./UserContext"

function UpgradeItem({ name, upgrades, quantity, cost, setQuant }){

    const { points, setPoints } = useContext(UserContext)

    const handleBuy = () => {
        if (points >= cost) {
            setPoints(points - cost)
            setQuant(quantity + 1)
        }
    }

    return(
        <div className="w-full h-max min-h-20 bg-white flex items-center justify-between p-2">
            <div className="flex gap-2">
                <div>{name}</div>
                <div>{quantity}</div>
                <div>{cost}</div>
                <div className="bg-slate-200" onClick={handleBuy}>buy</div>
            </div>
            <div className="flex gap-2 flex-wrap">
                {upgrades.map((item) => <UpgradeItemUpgrade key={item.key} name={item.name} />)}
            </div>
        </div>
    )
}

export default UpgradeItem