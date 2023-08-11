import {useNavigate} from "react-router-dom";
import "./PaginationButtons.css"

interface Attributes{
    pageCount:number,
    currentPage:number
}
function PaginationButton(props:Attributes)
{
    const navigator = useNavigate()
    function GoToPage(page:number)
    {
        navigator("../table/"+page);
    }

    return <div className="paginationButtons">
        {props.currentPage > 1 &&
            <button className="pageButton" onClick={()=>GoToPage(1)}>1</button>}
        {props.currentPage > 3 &&
            <button className="dots">...</button>}
        {props.currentPage > 2 &&
            <button className="pageButton" onClick={()=> GoToPage(props.currentPage-1)}>{props.currentPage-1}</button>}
        <button className="pageButton current" onClick={()=>GoToPage(props.currentPage)}>{props.currentPage}</button>
        {props.currentPage < props.pageCount &&
            <button className="pageButton" onClick={()=>GoToPage(props.currentPage+1)}>{props.currentPage+1}</button>}
        {props.currentPage<props.pageCount-2 &&
            <button className="dots">...</button>}
        {props.currentPage < props.pageCount-1 &&
            <button className="pageButton" onClick={()=>GoToPage(props.pageCount)}>{props.pageCount}</button>}
    </div>
}

export default PaginationButton;