import React, {useEffect, useState} from 'react';
import URLTable from "./URLTable";
import "./index.css"
import AddUrlForm, {UrlInfo} from "./AddUrlForm";
import {useUsername} from "../../contexts/authProvider";
function UrlTablePage() {
    const [urlList,setUrlList] = useState(Array<UrlInfo>);
    const username = useUsername();
    useEffect(() =>{
        fetch("https://localhost:44390/ShortUrl",{
            method: "GET"
        }).then(res => res.json())
            .then(response=>{
                setUrlList(response.reverse());
            })
    }, [])
    function addUrl(url: UrlInfo){
        setUrlList([url,...urlList]);
    }

    function deleteUrl(shortUrl: string){
        setUrlList(urlList.filter(x=> x.shortUrl !== shortUrl));
    }

    return (
        <div>
            {username && <AddUrlForm addUrl={addUrl}></AddUrlForm>}
            <URLTable urlList={urlList} deleteUrl={deleteUrl}/>
        </div>
    );
}

export default UrlTablePage;
