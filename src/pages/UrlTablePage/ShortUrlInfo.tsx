import "./ShortUrlInfo.css"
import {useEffect, useState} from "react";
import {useIsAdmin, useToken, useUsername} from "../../contexts/authProvider";

interface Attributes{
    shortUrlForInfo: string,
    closeWindow: ()=>void,
    deleteUrl: (shortUrl:string) => void
}
function ShortUrlInfo(params:Attributes){
    const [fullUrl, setFullUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const token = useToken();
    const username = useUsername();
    const isAdmin = useIsAdmin();

    useEffect(()=>{
        fetch("https://localhost:44390/ShortUrl/fullLink/" + params.shortUrlForInfo,{
            method:"GET"
        }).then(res => res.json())
            .then(responce => {
                setFullUrl(responce.fullUrl);
                setAuthor(responce.author);
                setCreatedDate(responce.createdDate);
        })
    },[])

    function deleteUrl(){
        fetch("https://localhost:44390/ShortUrl/" + params.shortUrlForInfo,{
            method: "Delete",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => console.log(res.ok))
        params.deleteUrl(params.shortUrlForInfo);
        params.closeWindow();
    }

    return <div className="overlayInfo">
        <div className="urlInfoModal">
            <button className="closeButton" onClick={() => params.closeWindow()}>X</button>
            <h1>Short Url</h1>
            <div className="infoBlock">
                <div className="infoContainer">
                    Full url
                    <div className="urlContainer">
                        <a href={fullUrl}>{fullUrl}</a>
                    </div>
                </div>
                <div className="infoContainer">
                    Short url
                    <div className="urlContainer">
                        <a href={window.location.origin + "/" + params.shortUrlForInfo}>
                            {window.location.origin + "/" + params.shortUrlForInfo}</a>
                    </div>
                </div>
                <span className="infoContainer">Created By: {author}</span>
                <span className="infoContainer">Created Date: {createdDate}</span>
            </div>
            {(username === author || isAdmin )&&<button className="deleteButton" onClick={()=>deleteUrl()}>Delete</button>}
        </div>
    </div>
}
export default ShortUrlInfo;