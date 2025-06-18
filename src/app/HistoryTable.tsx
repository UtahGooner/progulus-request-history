import React from 'react';
import {useAppSelector} from "./configureStore";
import {selectHistory, selectLoading} from "../features/history";
import HistoryRow from "./HistoryRow";

const HistoryTable = () => {
    const history = useAppSelector(selectHistory);
    const loading = useAppSelector(selectLoading);

    return (
        <div className="table-responsive">
            {loading && (
                <div style={{width: '100%', height: '0.25rem', margin: '0.25rem 0'}} className="progress">
                    <div className="progress-bar progress-bar-striped active" style={{width: '100%'}}/>
                </div>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>Artist</th>
                    <th>Song</th>
                    <th align="right">Duration</th>
                    <th align="right">Played</th>
                    <th align="right">Requested</th>
                    <th align="right">Wait</th>
                    <th>Requester</th>
                    <th align="right">*</th>
                </tr>
                </thead>
                <tbody>
                {history.map((row) => (
                    <HistoryRow row={row} key={row.ID}/>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default HistoryTable;
