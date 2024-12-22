import { createContext } from "react";

export const UserContext = createContext({
    user: "guest",
    setUser: () => {},
    points: 0,
    setPoints: () => {},
    clickMultiplier: 1,
    setClickMultiplier: () => {},
})