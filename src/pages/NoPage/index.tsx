import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./index.css";

function NoPage(){
    const [message, setMessage] = useState("");
    const {link} = useParams();
    useEffect(()=>{
        fetch("https://shrturl.azurewebsites.net/ShortUrl/fullLink/" + link,{
            method:"GET"
        }).then(res => {
            if(res.status === 200) {
                setMessage("Redirecting...");
                return res.json();
            }
            else if(res. status === 404) {
                setMessage("404 Not found");
            }
        }).then(responce => {
            if(!responce)
                return;
            window.location.replace(responce.fullUrl)
        })
    },[])

    return <div className="message">
        <h1>{message}</h1>
    </div>
}
export default NoPage;