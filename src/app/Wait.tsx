import React from 'react';

const Wait = ({played, requested}: { played: string, requested: string | null }) => {
    if (!requested) {
        return null;
    }
    const d = new Date(played);
    const r = new Date(requested);
    const diff = d.valueOf() - r.valueOf();
    return (
        <span>{Math.floor(diff / 60000)}</span>
    )
}

export default Wait;
