import {HistoryNavProps, PlayHistory} from "./types";

const historyURL = '/api/stats/recent.php';

export async function fetchHistory(props:HistoryNavProps):Promise<PlayHistory[]> {
    try {
        const query = new URLSearchParams();
        query.set('start', (props.page * props.rowsPerPage).toString());
        query.set('limit',  Math.max(props.rowsPerPage, 100).toString());
        if (props.me) {
            query.set('me', '1');
        }
        const url = `${historyURL}?${query.toString()}`;
        const res = await fetch(url, {credentials: 'same-origin', cache: 'no-cache'});
        const json = await res.json();
        return json.history || [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchHistory()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchHistory()", err);
        return Promise.reject(new Error('Error in fetchHistory()'));
    }
}

