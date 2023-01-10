import React from 'react';

const ArtistLink = ({artist}:{artist:string}) => {
    const href = `/rprweb/info.php?artist=${encodeURIComponent(artist)}`;
    return (
        <a href={href} rel="nofollow">{artist}</a>
    )
}

export default ArtistLink;
