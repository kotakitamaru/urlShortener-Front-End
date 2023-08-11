import React, {useRef, useState} from 'react';
import "./AddUrlForm.css";
import {useToken, useUsername} from "../../contexts/authProvider";
interface Attributes{
    addUrl: (url:UrlInfo) => void
}
export interface UrlInfo{
    id:string,
    fullUrl:string,
    shortUrl:string,
}
function AddUrlForm(props:Attributes){
    const urlInputRef = useRef<HTMLInputElement>(null);
    const token = useToken();
    const username = useUsername();
    const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!urlInputRef.current)
        {
            return;
        }
        if(!username || !token || !urlInputRef.current.value)
            return;
        fetch("https://shrturl.azurewebsites.net/ShortUrl",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json',
                            Authorization: "bearer " + token},
                body: JSON.stringify(
                    {
                            fullUrl: urlInputRef.current.value,
                            author: username
                            })
            }).then(res => res.json())
            .then((response) => {
                if(response.status === 409){
                    alert("Url already exist");
                    return;
                }
                props.addUrl(response);
                if(urlInputRef.current)
                    urlInputRef.current.value = "";
            },(error) => {
                console.log(error);
            })
    }

    return <>
        <form onSubmit={submitHandler} className="addUrlForm">
            <input ref={urlInputRef} type="url" placeholder="https://..."></input>
            <button type="submit">Shorter my url!</button>
        </form>
    </>
}
export default AddUrlForm;