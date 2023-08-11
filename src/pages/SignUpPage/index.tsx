import "../LoginPage/index.css";
import "./index.css"
import React, {useState} from "react";
import {useSetIsAdmin, useSetToken, useSetUsername} from "../../contexts/authProvider";
import {Link, useNavigate} from "react-router-dom";

function SignUpPage(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const setGlobalUsername = useSetUsername();
    const setToken = useSetToken();
    const setIsAdmin = useSetIsAdmin();
    const navigator = useNavigate()
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    function submitHandler(event:React.SyntheticEvent<HTMLFormElement>){
        event.preventDefault();

        if(!username || !password)
        {
            alert("All fields must be filled");
            return;
        }

        fetch("https://localhost:44390/Auth/register",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                })
        }).then(res => res.status === 409?null:res.json())
            .then((response)=>{
                if(!response)
                {
                    alert("This username is already taken")
                    return;
                }
                setGlobalUsername(username);
                localStorage.setItem('username',username);
                setToken(response.token);
                localStorage.setItem('token',response.token);
                setIsAdmin(response.isAdmin);
                localStorage.setItem('isAdmin',response.isAdmin);
                navigator("/");
            })

    }

    return <form onSubmit={submitHandler} className="loginForm">
        <span>Url Shortener</span>
        <div className="inputs">
            <label htmlFor="login">Login</label>
            <input id="login" onChange={(e)=>setUsername(e.target.value)}
                   value={username} type="text"/>
            <label htmlFor="password">Password</label>
            <div className="passwordContainer">
                <input id="password" onChange={(e)=>setPassword(e.target.value)}
                   value={password} type={isPasswordVisible?"text":"password"}/>
                <button type="button" className={isPasswordVisible?"showButtonActive":"showButton"}
                        onClick={()=> setPasswordVisible(isPasswordVisible => !isPasswordVisible)}/>
            </div>
            <button className="submitButton" type="submit">Sign Up</button>
            <span className="createAccountText">Already have an account? <Link to="../login">Log In</Link></span>
        </div>
    </form>
}

export default SignUpPage;