import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { ArticlesDataType, newArticles, concatArticles, addBookMark, removeBookMark, addPage, setQuery } from '../modules/Articles'
import { useCallback } from 'react';

function useArticles(){
    const articlesState = useSelector((state:RootState) => state.Articles);
    const dispatch = useDispatch();

    const onNewArticles = useCallback((data: ArticlesDataType)=>{
        dispatch(newArticles(data))
    }, [dispatch]);

    const onConcatArticles = useCallback((data: ArticlesDataType)=>{
        dispatch(concatArticles(data))
    }, [dispatch]);

    const onAddBookMark = useCallback((data: ArticlesDataType)=>{
        dispatch(addBookMark(data))
    }, [dispatch]);

    const onRemoveBookMark = useCallback((data: ArticlesDataType)=>{
        dispatch(removeBookMark(data))
    }, [dispatch]);

    const onAddPage = useCallback(()=>{
        dispatch(addPage())
    }, [dispatch]);

    const onSetQuery = useCallback((data: ArticlesDataType)=>{
        dispatch(setQuery(data))
    }, [dispatch]);

    return {
        articlesState,
        onNewArticles,
        onConcatArticles,
        onAddBookMark,
        onRemoveBookMark,
        onAddPage,
        onSetQuery
    }
}

export default useArticles;