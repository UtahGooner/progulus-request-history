import React from 'react';
import {PlayHistory} from "../types";
import {durationToMS} from "../utils";
import DatePlayed from "./DatePlayed";
import Wait from "./Wait";
import classNames from "classnames";
import ArtistLink from "./ArtistLink";
import SongLink from "./SongLink";

const epicDuration = 13 * 60 * 1000;
const HistoryRow = ({row}: { row: PlayHistory }) => {
    const rowClassName = classNames({
        epic: (+row.duration) > epicDuration,
        hal: !row.username
    })
    return (
        <tr className={rowClassName}>
            <td><ArtistLink artist={row.artist} /></td>
            <td><SongLink artist={row.artist} album={row.album} title={row.title} /></td>
            <td className="right">{durationToMS(row.duration)}</td>
            <td className="right" style={{whiteSpace: 'nowrap'}}>
                <DatePlayed value={row.date_played}/>
            </td>
            <td className="right" style={{whiteSpace: 'nowrap'}}>
                <DatePlayed value={row.date_requested}/>
            </td>
            <td className="right">
                <Wait played={row.date_played} requested={row.date_requested}/>
            </td>
            <td>{row.username}</td>
            <td className="right">{row.listeners}</td>
        </tr>
    )
}

export default HistoryRow;
