import React from 'react';

const SongLink = ({artist, album, title}:{artist:string; album:string; title: string}) => {
    const href = `/rprweb/info.php?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`;
    return (
        <a href={href} rel="nofollow">{title}</a>
    )
}

export default SongLink;
