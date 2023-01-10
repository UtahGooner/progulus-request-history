import React from 'react';

const DatePlayed = ({value}: { value: string | null }) => {
    if (!value) {
        return null;
    }
    const d = new Date(value);
    const today = new Date();
    const isToday = d.toLocaleDateString() === today.toLocaleDateString();
    return (
        <div>
            {!isToday && (<div>{d.toLocaleDateString(undefined, {month: '2-digit', day: '2-digit'})}</div>)}
            <div>{d.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
        </div>
    )
}

export default DatePlayed;
