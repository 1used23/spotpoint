import React, { useState, useEffect } from "react";
import token from './token'

export default function Tracklist({ id }) {
    const [tracks, setTracks] = useState();
    useEffect(() => {
        const FETCH_URL = `https://api.spotify.com/v1/albums/${id}/tracks`;

        const myOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            },
            mode: "cors",
            cache: "no-cache"
        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const tracks = !json.error ? json.items : null;
                setTracks(tracks);
            });
    }, []);

    return (
        <div>{tracks && tracks.map(track => <li key={track.name}>
            {track.name}
        </li>)}</div>
    )
}