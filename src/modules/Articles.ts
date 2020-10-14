import {docsType} from '../components/docs/DocsListItem';

const NEW_ARTS = 'articles/new' as const;
const CONCAT_ARTS = 'articles/concat' as const;
const ADD_BOOKMARK = 'bookmark/add' as const;
const REMOVE_BOOKMARK = 'bookmark/remove' as const;
const ADD_PAGE = 'page/add' as const;
const SET_QUERY = 'query/set' as const;

export type ArticlesDataType = {
    _id?: string;
    query?: string;
    page?: number;
    articles?: docsType[];
    bookmarks?: docsType[];
}

export const newArticles = (data: ArticlesDataType) => ({
    type: NEW_ARTS,
    payload: {
        articles: data.articles
    }
});

export const concatArticles = (data: ArticlesDataType) => ({
    type: CONCAT_ARTS,
    payload: {
        articles: data.articles
    }
});

export const addBookMark = (data: ArticlesDataType) => ({
    type: ADD_BOOKMARK,
    payload: {
        bookmarks: data.bookmarks
    }
});

export const removeBookMark = (data: ArticlesDataType) => ({
    type: REMOVE_BOOKMARK,
    payload: {
        _id: data._id
    }
});

export const addPage = () => ({
    type: ADD_PAGE
});

export const setQuery = (data: ArticlesDataType) => ({
    type: SET_QUERY,
    payload: {
        query: data.query
    }
});

type ArticlesAction = 
    | ReturnType<typeof newArticles>
    | ReturnType<typeof concatArticles>
    | ReturnType<typeof addBookMark>
    | ReturnType<typeof removeBookMark>
    | ReturnType<typeof addPage>
    | ReturnType<typeof setQuery>

const initalState = {
    articles: [],
    bookmarks: [],
    page: 0,
    query: ''
}

function Articles(state: ArticlesDataType = initalState, action: ArticlesAction): ArticlesDataType{
    switch(action.type){
        case NEW_ARTS:
            return {
                ...state,
                articles: action.payload.articles,
            }
        case CONCAT_ARTS:
            if(state.articles && action.payload.articles){
                return {
                    ...state,
                    articles: state.articles.concat(action.payload.articles)
                }
            }else{
                return state
            }
            
        case ADD_BOOKMARK:
            if(state.bookmarks !== undefined && action.payload.bookmarks !== undefined){
                return {
                    ...state,
                    bookmarks: state.bookmarks.concat(action.payload.bookmarks)
                }
            }else{
                console.log('fffg', state.bookmarks);
                console.log('fffg', action.payload.bookmarks);
                return state;
            }
            
        case REMOVE_BOOKMARK:
            if(state.bookmarks){
                return {
                    ...state,
                    bookmarks: state.bookmarks.filter(item => item._id !== action.payload._id)
                }
            }else{
                return state;
            }

        case ADD_PAGE:
            if(state.page !== undefined){
                return {
                    ...state,
                    page: state.page + 1
                }
            }else{
                return state;
            }
            
        case SET_QUERY: // 새로 검색시 페이지 초기화
            return {
                ...state,
                page: 0,
                query: action.payload.query
            }
            
        default:
            return state;
    }
}

export default Articles;