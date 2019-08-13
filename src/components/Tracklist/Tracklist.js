import React, { useState, useEffect } from "react";
import token from "../token";
import Fetch from "../fetch";

export default function Tracklist({ id }) {
  const [tracks, setTracks] = useState();
  const FETCH_URL = `https://api.spotify.com/v1/albums/${id}/tracks`;

  Fetch(FETCH_URL, token, setTracks, id, "items");

  return (
    <div>
      <ul>
        {tracks && tracks.map(track => <li key={track.name}>{track.name}</li>)}
      </ul>
    </div>
  );
}
