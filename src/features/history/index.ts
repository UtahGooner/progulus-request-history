import {HistoryNavProps, PlayHistory} from "../../types";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchHistory} from "../../api";
import {RootState} from "../../app/configureStore";
// import {staticHistory} from '../../../public/static-history';


export interface HistoryState {
    list: PlayHistory[];
    status:QueryStatus;
    page: number;
    rowsPerPage: number;
    me: boolean;
}

export const initialHistoryState:HistoryState = {
    list: [],
    status: QueryStatus.uninitialized,
    page: 0,
    rowsPerPage: 25,
    me: false,
}

export const selectPage = (state:RootState) => state.history.page;
export const selectRowsPerPage = (state:RootState) => state.history.rowsPerPage;
export const selectMe = (state:RootState) => state.history.me;
export const selectHistory = (state:RootState) => state.history.list;
export const selectLoading = (state:RootState) => state.history.status === QueryStatus.pending;
export const selectLoaded = (state:RootState) => state.history.status === QueryStatus.fulfilled;

export const loadHistory = createAsyncThunk<PlayHistory[], HistoryNavProps>(
    'history/load',
    async (arg, {getState}) => {
        return await fetchHistory(arg);
    }
)

export const setPage = createAction<number>('history/setPage');

export const setRowsPerPage = createAction<number>('history/setRowsPerPage');
export const toggleMe = createAction<boolean|undefined>('history/toggleMe');

const historyReducer = createReducer(initialHistoryState, (builder) => {
    builder
        .addCase(setPage, (state, action) => {
            state.page = action.payload;
        })
        .addCase(setRowsPerPage, (state, action) => {
            state.rowsPerPage = action.payload;
        })
        .addCase(toggleMe, (state, action) => {
            state.me = action.payload ?? !state.me;
        })
        .addCase(loadHistory.pending, (state, action) => {
            state.page = action.meta.arg.page;
            state.rowsPerPage = action.meta.arg.rowsPerPage;
            state.me = action.meta.arg.me;
            state.status = QueryStatus.pending;
        })
        .addCase(loadHistory.rejected, (state) => {
            state.status = QueryStatus.rejected;
        })
        .addCase(loadHistory.fulfilled, (state, action) => {
            state.status = QueryStatus.fulfilled;
            state.list = action.payload;
        })
})

export default historyReducer;
