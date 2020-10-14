import React, { useCallback, useEffect, useRef, useState } from 'react';
import {BsHeartFill} from 'react-icons/bs';
import useArticles from '../../hooks/useArticles';

export type docsType = {
    _id: string;
    abstract: string;
    headline: {
        main: string;
    };
    web_url: string;
    pub_date: string;
    byline: {
        original: string;
    };
    multimedia: {
        subType: string;
        url: string;
    }[];
    bookmark?: boolean;

} // 필요한 부분만 타입을 선언했습니다."square320"

function DocsListItem({docsData}: {docsData: docsType}){

    // console.log('fff', docsData.multimedia);

    const {articlesState, onAddBookMark, onRemoveBookMark} = useArticles();
    const [bookmarkF, setBookMarkF] = useState(false);

    const absRef = useRef<HTMLDivElement | null>(null);
    const [newDate, setNewDate] = useState(docsData.pub_date);

    const originUrl = 'https://www.nytimes.com/'
    const imageUrl = docsData.multimedia.find((val) => val.subType === "square320")?.url;

    const figureStyle = {
        backgroundImage: `url(${originUrl + imageUrl})`
    }

    const openPage = useCallback((url: string) =>{
        window.open(url);
    }, []);

    const moreCopy = useCallback(() =>{
        if(absRef.current){
            absRef.current.innerText = docsData.abstract;
        }
    }, []);


    const checkDate = useCallback((date:number) =>{
        if(date.toString().length == 1){
            return "0" + date.toString();
        }else{
            return date.toString();
        }
    }, []);

    const newDateFilter = useCallback(()=>{
        const newDate = new Date(docsData.pub_date);
        const year = newDate.getUTCFullYear(); // 2020
        const month = checkDate(newDate.getUTCMonth());
        const day = checkDate(newDate.getUTCDay());
        const hour = checkDate(newDate.getUTCHours());
        const minutes = checkDate(newDate.getUTCMinutes());
        const seconds = checkDate(newDate.getUTCSeconds());

        return `${year}.${month}.${day} ${hour}:${minutes}:${seconds}`;
    }, []);

    useEffect(()=>{
        setNewDate(newDateFilter());
        checkBookMark(docsData._id);
    }, []);

    const addBookMark = (e:React.MouseEvent<SVGElement, MouseEvent>) =>{
        if(e.currentTarget.classList.contains('on')){
            onRemoveBookMark({_id: docsData._id});
            setBookMarkF(false);
        }else{
            onAddBookMark({bookmarks: [docsData]});
            setBookMarkF(true);
        }
    }

    // 북마크 DB에 있는 ID값을 비교하여 북마크를 표시한다.
    const checkBookMark = (_id: string) =>{
        let flag = false;
        if(articlesState.bookmarks){
            articlesState.bookmarks.forEach(function(val){
                if(_id == val._id){
                    flag = true;
                }
            });
        }
        if(flag){
            setBookMarkF(true);
        }
    }

    return (
        <li className="orbis-docs__list-item">
            <div className="orbis-docs__item-copies">
                <h3 className="orbis-docs__item-headline">
                    <span onClick={()=>openPage(docsData.web_url)}>{docsData.headline.main}</span>
                    <BsHeartFill onClick={addBookMark} className={`orbis-docs__heart-icon ${bookmarkF ? 'on' : ''}`} />
                </h3>
                <div className="orbis-docs__item-article" ref={absRef}>
                    {docsData.abstract.substr(0, 30)}
                    <span className="orbis-docs__item-more-btn" onClick={moreCopy}>...more</span>
                </div>
                <div className="orbis-docs__item-info">
                    <div className="orbis-docs__item-date">
                        {newDate}
                    </div>
                    <div className="orbis-docs__item-writer">
                        {docsData.byline.original}
                    </div> 
                </div>
            </div>
            <div className="orbis-docs__item-image" onClick={()=>openPage(docsData.web_url)}>
                <figure style={figureStyle}></figure>
            </div>
        </li>
    )
}

export default DocsListItem;