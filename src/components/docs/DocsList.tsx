import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import DocsListItem from '../docs/DocsListItem';
import {BsArrowRepeat} from 'react-icons/bs';
import useArticles from '../../hooks/useArticles';

function DocsList(){
    const key = 'wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu'; // api 키
    const [loading, setLoading] = useState(false);
    const {
        articlesState, 
        onNewArticles, 
        onConcatArticles, 
        onAddPage,
    } = useArticles();

    // 초기 로직
    useEffect(()=>{
        Axios({
            method: 'get',
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=${key}`
        }).then((res)=>{
            // console.log('res.data.response.docs', res.data.response.docs);
            onNewArticles({articles: res.data.response.docs});
        });
        window.scrollTo(0, 0);
    }, []);

    // 페이지 로직
    const notFirstRender_page = useRef(true);
    useEffect(()=>{
        if(notFirstRender_page.current){
            notFirstRender_page.current = false;
            return;
        }
        Axios({
            method: 'get',
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${articlesState.query}&api-key=${key}&page=${articlesState.page}`
        }).then((res)=>{
            // console.log('res.data.response.docs', res.data.response.docs);
            console.log('page');
            onConcatArticles({articles: res.data.response.docs});
        });
    }, [articlesState.page]);

    // 검색 로직
    const notFirstRender_query = useRef(true);
    useEffect(()=>{
        if(notFirstRender_query.current){
            notFirstRender_query.current = false;
            return;
        }
        Axios({
            method: 'get',
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${articlesState.query}&api-key=${key}&page=${articlesState.page}`
        }).then((res)=>{
            // console.log('res.data.response.docs', res.data.response.docs);
            console.log('query');
            onNewArticles({articles: res.data.response.docs});
        });
    }, [articlesState.query]);

    // 스크롤 로직
    useEffect(()=>{
        const scrollFunc = ()=>{
            if(window.scrollY + window.innerHeight === document.body.scrollHeight + 60){
                setLoading(true);
                onAddPage();
            }
        }
        window.addEventListener('scroll', scrollFunc);   
        return () =>{
            window.removeEventListener('scroll', scrollFunc);
        }
    });

    return (
        <section className="orbis-docs__list-section">
            <div className="orbis-docs__list-title-wrapper">
                <div className="orbis-docs__list-title">
                    <h1>{articlesState.query === '' ? 'HOME' : `Result of "${articlesState.query}"`}</h1>
                </div>
            </div> 
            {
                (articlesState.articles && articlesState.articles.length > 0) && (
                    <div>
                        <ul className="orbis-docs__list-wrapper">
                            {articlesState.articles?.map((data) => <DocsListItem key={data._id} docsData={data} />)}
                        </ul>
                        <div className={`orbis-docs__list-loading ${loading ? 'on' : ''}`}>
                            <BsArrowRepeat className="orbis-docs__loading-icon" />
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default DocsList;