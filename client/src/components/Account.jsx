import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import AccountButton from "./AccountButton";
import "axios";
import axios from "axios";
import api from "./api";

function Account(){

    const { user, setUser } = useContext(UserContext);
    const [ signingUp, setSigningUp ] = useState(false);
    const [ loggingIn, setLoggingIn ] = useState(false);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
              const response = await api.get('/profile');
              setUser(response.data.username);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password
        }

        if (signingUp) {
            axios.post("http://127.0.0.1:5000/signup", userData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            setSigningUp(false);
            return;
        } else if (loggingIn) {
            axios.post("http://127.0.0.1:5000/login", userData, { withCredentials: true })
            .then((response) => {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                setUser(response.data.username);
            })
            .catch((error) => {
                console.log(error);
            })
            setLoggingIn(false);
            return;
        }
    } 

    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser("guest");
    }

    if (user == "guest" && !signingUp & !loggingIn) {
        return(
            <div>
                <div className="flex gap-2 justify-end">
                    <AccountButton onClick={() => setLoggingIn(true)}>Log in</AccountButton>
                    <AccountButton onClick={() => setSigningUp(true)}>Sign up</AccountButton>
                </div>
                <h1>Log in or sign up to save your progress!</h1>
            </div>
        )
    } else if (signingUp || loggingIn) {
        return(
            <form className="h-full w-max flex flex-col gap-1" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} className="text-black"></input>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="text-black"></input>
                <input type="submit" className="mx-auto" value="submit"/>
            </form>
        )
    }
    else {
        return (
        <div>
            <h1>Hello, {user}!</h1>
            <AccountButton onClick={handleLogOut}>Log out</AccountButton>
        </div>
    )
    }
}

export default Account