export interface PlayHistory {
    ID: number|string;
    songID: string|number;
    artist: string;
    album: string;
    title: string;
    duration: string|number;
    rating: string|number;
    votes: string|number;
    date_played: string;
    date_requested: string|null;
    wait: string|null;
    username: string|null;
    listeners: number|string;
}


export interface HistoryResponse {
    user: string;
    history: PlayHistory[],
    me: boolean|null;
    start: number;
}

export interface HistoryNavProps {
    page: number;
    rowsPerPage: number;
    me: boolean;
}
