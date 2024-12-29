import { useContext, useEffect, useRef, useState } from "react"
import UpgradeItem from "./UpgradeItem"
import { UserContext } from "./UserContext";
import api from "./api";
import upgradeData from "./upgradesData";

function Upgrades(){

    const { setClickMultiplier, points, setPoints, progress, setProgress, user, setAutoMultiplier } = useContext(UserContext);

    const progressRef = useRef(progress);
    const pointsRef = useRef(points);

    // calculate cost of the upgrade TODO: add a cost multiplier to base upgradeData 
    const calculateCost = (quantity, baseCost) => baseCost * (quantity + 1) * 0.5; 
    
    const handleUpgrade = (key) => {
        const newProgress = { ...progress };
        const cost = calculateCost(newProgress[key], upgradeData[key].baseCost);
        if (cost > points) return;
        newProgress[key] += 1;
        setPoints(points - cost);
        setProgress(newProgress);
    }

    // using useRef because of problem with not updating progress
    useEffect(() => {
        progressRef.current = progress;
    }, [progress]);

    useEffect(() => {
        pointsRef.current = points;
    }, [points]);

    useEffect(() => {
        const saveProgress = () => {
            const data = {
                progress_data: progressRef.current,
                points: pointsRef.current,
            }
            if (user != "guest"){ 
                console.log(data)
                api.post("/save", data)
                .catch((error) => console.log(error));
            }
        }

        const intervalId = setInterval(saveProgress, 60000);

        return () => clearInterval(intervalId);
    }, [user]);

    // update multipliers every progress change
    useEffect(() => {
        let newClickMultiplier = 1;
        let newAutoMultiplier = 0;
        Object.keys(progress).forEach(key => {
            const item = upgradeData[key];
            if (item.type == "click") {
                newClickMultiplier += progress[key] * item.multiplier;
            } else if (item.type == "auto") {
                newAutoMultiplier += progress[key] * item.multiplier;
            }
        });
        setAutoMultiplier(newAutoMultiplier);
        setClickMultiplier(newClickMultiplier);
    }, [progress]);

    return(
        <div className="w-full h-max">
            <div className="w-full h-10 border-black border-2 bg-slate-500 rounded-md text-2xl flex gap-2 items-center justify-between px-2 text-center">
                <span className="w-[64px]"></span>
                <span className="flex-grow-[2] flex-1">name</span>
                <span className="flex-grow-[2] flex-1">quantity</span>
                <span className="flex-grow-[2] flex-1">cost</span>
                <span className="w-[64px]"></span>
            </div>
            {Object.keys(upgradeData).map((key) => {
                const upgrade = upgradeData[key];
                const quantity = progress[key] === undefined ? 0 : progress[key];
                return <UpgradeItem key={key} name={upgrade.progressName} quantity={quantity} cost={calculateCost(quantity, upgrade.baseCost)} icon={upgrade.icon} onUpgrade={() => handleUpgrade(key)}/>
            })}
        </div>
    )
}

export default Upgrades