import {combineReducers} from 'redux';
import Articles from './Articles';

const rootReducer = combineReducers({
    Articles
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;