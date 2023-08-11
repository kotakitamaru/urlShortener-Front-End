import React, {useEffect, useState} from 'react';
import "./URLTable.css";
import {UrlInfo} from "./AddUrlForm";
import {useNavigate, useParams} from "react-router-dom";
import PaginationButton from "./PaginationButtons";
import ShortUrlInfo from "./ShortUrlInfo";
import shortUrlInfo from "./ShortUrlInfo";
import {useUsername} from "../../contexts/authProvider";

interface Attributes{
    urlList:Array<UrlInfo>,
    deleteUrl:(str:string)=>void
}
function URLTable(props:Attributes)
{
    const {page} = useParams();
    const username = useUsername();
    const [urlForInfo, setUrlForInfo] = useState<string>("");
    const [isOpenUrlInfo, setIsOpenUrlInfo] = useState<boolean>(false);
    const elementsPerPage:number = 7;
    const pageCount:number = Math.ceil(props.urlList.length / elementsPerPage);
    let currentPage = page?parseInt(page):1;
    currentPage = currentPage < 1 || Number.isNaN(currentPage)? 1: currentPage;
    currentPage = currentPage > pageCount? pageCount: currentPage;
    const urlsOnPage = props.urlList.slice((currentPage-1) * elementsPerPage,currentPage*elementsPerPage);

    function openInfo(shortUrl:string)
    {
        if(!username)
        {
            alert("You have to log in to access this information");
            return;
        }
        setUrlForInfo(shortUrl);
        setIsOpenUrlInfo(true);
    }
    function closeInfo()
    {
        setIsOpenUrlInfo(false);
    }

    return <>
        <div className="tableContainer">
         <table>
            <thead>
                <tr>
                    <th style={{width:"60%"}}>Full URL</th>
                    <th style={{width:"30%"}}>Short URL</th>
                </tr>
            </thead>
            <tbody>
            {urlsOnPage.map((x)=>{
                return <tr key={"row" + x.id} onClick={()=> openInfo(x.shortUrl)}>
                    <td key={"fullUrl_" + x.id}>
                        <div className="linkCell">
                            <a className="url" href={x.fullUrl} >{x.fullUrl}</a>
                        </div>
                    </td>
                    <td key={"shortUrl_" + x.id}>
                        <a className="url" href={window.location.origin + "/" + x.shortUrl}>
                            {window.location.origin + "/" + x.shortUrl}</a>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        <PaginationButton pageCount={pageCount} currentPage={currentPage}/>
    </div>
{isOpenUrlInfo&&<ShortUrlInfo shortUrlForInfo={urlForInfo} closeWindow={closeInfo} deleteUrl={props.deleteUrl}/>}</>
}

export default URLTable;