import React, { useState, useEffect } from "react";
import token from "./token";
import Fetch from "./fetch";

export default function RelatedArtists({ id }) {
  const [artists, setArtists] = useState();
  const FETCH_URL = `https://api.spotify.com/v1/artists/${id}/related-artists`;

  Fetch(FETCH_URL, token, setArtists, id, 'artists');

  return (
    <div>
      <ul>
        {artists &&
          artists.map(artist => (
            <li key={artist.name}>
              <a href={`/search/${artist.name}`}>{artist.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
