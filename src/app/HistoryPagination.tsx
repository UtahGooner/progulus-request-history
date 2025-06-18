import React, {ChangeEvent, useEffect, useId} from 'react';
import {useAppDispatch, useAppSelector} from "./configureStore";
import {loadHistory, selectLoading, selectMe, selectPage, selectRowsPerPage, setRowsPerPage} from "../features/history";
import {FirstPageIcon, NavigateBeforeIcon, NavigateNextIcon} from "./NavIcons";

const HistoryPagination = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(selectPage);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const me = useAppSelector(selectMe);
    const loading = useAppSelector(selectLoading);
    const selectId = useId();
    const userId = useId();

    useEffect(() => {
        dispatch(loadHistory({page, rowsPerPage, me}));
    }, [])
    const selectChangeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(loadHistory({page, rowsPerPage: Number(ev.target.value), me}))
        dispatch(setRowsPerPage(Number(ev.target.value)));
    }

    const onNavigate = (page: number) => {
        dispatch(loadHistory({page, rowsPerPage, me}));
    }

    const onChangeMe = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(loadHistory({page: 0, rowsPerPage, me: ev.target.value === 'me'}))
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 0.5rem'
        }}>
            <div>
                <label style={{marginRight: '0.25rem', display: 'inline'}} htmlFor={userId}>History</label>
                <select id={userId} className="form-select form-select-sm" style={{display: 'inline', width: 'auto'}}
                        value={me ? 'me' : 'progulus'} onChange={onChangeMe}>
                    <option value="progulus">Progulus</option>
                    <option value="me">Me</option>
                </select>
            </div>
            <div>
                <label htmlFor={selectId} style={{marginRight: '0.25rem', display: 'inline'}}>Rows per page:</label>
                <select className="form-select form-select-sm" style={{display: 'inline', width: 'auto'}}
                        value={rowsPerPage} onChange={selectChangeHandler}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div>{(page * rowsPerPage) + 1}-{page * rowsPerPage + rowsPerPage} of many</div>
            <button className="btn btn-sm btn-link" disabled={loading} onClick={() => onNavigate(0)}>
                <FirstPageIcon/>
            </button>
            <button className="btn btn-sm btn-link" disabled={loading}
                    onClick={() => onNavigate(Math.max(page - 1, 0))}>
                <NavigateBeforeIcon />
            </button>
            <button className="btn btn-sm btn-link" disabled={loading} onClick={() => onNavigate(page + 1)}>
                <NavigateNextIcon/>
            </button>
        </div>
    )
}
export default HistoryPagination;
