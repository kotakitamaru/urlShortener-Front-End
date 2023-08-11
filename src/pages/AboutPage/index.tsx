import "./index.css"
import {useIsAdmin, useToken} from "../../contexts/authProvider";
import {useEffect, useState} from "react";

function AboutPage(){
    const isAdmin = useIsAdmin()
    const [aboutText, setAboutText] = useState("");
    const token = useToken();

    useEffect(()=>{
        fetch("https://shrturl.azurewebsites.net/About",{
            method: "GET"
        }).then(res => res.text())
            .then(response => {
                setAboutText(response);
            })
    },[])

    function saveAboutText(){
        fetch("https://shrturl.azurewebsites.net/About",{
            method: "POST",
            body: JSON.stringify({
                aboutText: aboutText
            }),
            headers: {
                "Content-Type" : "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => console.log(res.ok))
    }

    return <div className="aboutContainer">
        <span className="title">Url Shortener</span>
        <span className="underTitle">About page</span>
        <textarea value={aboutText} onChange={e => setAboutText(e.target.value)}
                  onBlur={()=>saveAboutText()}
                  className="aboutText" readOnly={!(isAdmin === true)}/>
    </div>
}

export default AboutPage;