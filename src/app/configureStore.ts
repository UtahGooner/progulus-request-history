import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux'
import historyReducer from "../features/history";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const store = configureStore({
    reducer: combineReducers({
        history: historyReducer
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
