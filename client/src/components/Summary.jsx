import { useContext } from "react"
import { UserContext } from "./UserContext"
import AccountButton from "./AccountButton"

function Summary(){

    const { points, clickMultiplier, user } = useContext(UserContext)

    return(
        <div className="w-full h-1/5 text-2xl text-white flex justify-between">
            <div>
                Points: {Math.round(points * 100) / 100}
                <br />
                Click Multiplier: {Math.round(clickMultiplier * 100) / 100}
            </div>
            <div>
            {
                user == "guest" 
                ?   <div>
                        <div className="flex gap-2 justify-end">
                        <AccountButton>Log in</AccountButton>
                        <AccountButton>Sign up</AccountButton>
                        </div>
                        <h1>Log in or sign up to save your progress!</h1>
                    </div>
                :   <div>
                        <h1>Hello, {user}!</h1>
                        <AccountButton>Log out</AccountButton>
                    </div>
            }
            </div>
        </div>
    )
}

export default Summary