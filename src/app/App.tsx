import React from 'react';
import HistoryTable from "./HistoryTable";
import HistoryPagination from "./HistoryPagination";

const App = () => {
    return (
        <div id="historylist">
            <HistoryPagination/>
            <HistoryTable/>
        </div>
    )
};

export default App;
