import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import token from "../token";
import Fetch from "../fetch";

export default function RelatedArtists({ id }) {
  const [artists, setArtists] = useState();
  const FETCH_URL = `https://api.spotify.com/v1/artists/${id}/related-artists`;

  Fetch(FETCH_URL, token, setArtists, id, "artists");

  return (
    <div>
      <ul className="related">
        {artists &&
          artists.map(artist => (
            <li key={artist.name}>
              <Link to={`/search/${artist.name}`}>{artist.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
