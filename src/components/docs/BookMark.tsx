import React, { useEffect } from 'react';
import useArticles from '../../hooks/useArticles';
import DocsListItem from '../docs/DocsListItem';

function BookMark(){

    const {
        articlesState,
    } = useArticles();


    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    if(articlesState.bookmarks && articlesState.bookmarks.length > 0){
        
    }else{

    }
    

    return (
        <section className="orbis-docs__list-section">
            <div className="orbis-docs__list-title-wrapper">
                <div className="orbis-docs__list-title">
                    <h1>BOOKMARK {articlesState.bookmarks && (`(${articlesState.bookmarks.length})`)}</h1>
                </div>
            </div>            
            {
                (articlesState.bookmarks && articlesState.bookmarks.length > 0) && (
                    <ul className="orbis-docs__list-wrapper">
                        {articlesState.bookmarks.map((data) => <DocsListItem key={data._id} docsData={data} />)}
                    </ul> 
                )
            }
            {/* <div className={`orbis-docs__list-loading ${loading ? 'on' : ''}`}>
                <BsArrowRepeat className="orbis-docs__loading-icon" />
            </div> */}
        </section>
    )
}

export default BookMark;