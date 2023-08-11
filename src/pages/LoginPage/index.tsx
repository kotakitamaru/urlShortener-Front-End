import "./index.css";
import React, {useState} from "react";
import {useSetIsAdmin, useSetToken, useSetUsername} from "../../contexts/authProvider";
import {Link, useNavigate} from "react-router-dom";

function LoginPage(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const setGlobalUsername = useSetUsername();
    const setToken = useSetToken();
    const setIsAdmin = useSetIsAdmin();
    const navigator = useNavigate()
    function submitHandler(event:React.SyntheticEvent<HTMLFormElement>){
        event.preventDefault();

        if(!username || !password)
        {
            alert("All fields must be filled");
            return;
        }

        fetch("https://shrturl.azurewebsites.net/Auth/login",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                })
        }).then(async (res) => {
            if (res.ok)
                return res.json()
            throw new Error(await res.text());
        }).then(responce => {
            setGlobalUsername(username);
            localStorage.setItem('username',username);
            setToken(responce.token);
            localStorage.setItem('token',responce.token);
            setIsAdmin(responce.isAdmin);
            localStorage.setItem('isAdmin',responce.isAdmin);
            navigator("/");
        }).catch(error => {
            alert(error);
        })

    }

    return <form onSubmit={submitHandler} className="loginForm">
            <span>Url Shortener</span>
            <div className="inputs">
                <label htmlFor="login">Login</label>
                <input id="login" maxLength={10} onChange={(e)=>setUsername(e.target.value)}
                   value={username} type="text"/>
                <label htmlFor="password">Password</label>
                <input id="password" onChange={(e)=>setPassword(e.target.value)}
                   value={password} type="password"/>
                <button className="submitButton" type="submit">Log In</button>
                <span className="createAccountText">Don't have an account? <Link to="../signup">Create new</Link></span>
            </div>
        </form>
}

export default LoginPage;