import React, { useState, useEffect } from "react";
import token from "./token";

export default function RelatedArtists(props) {
  const [artists, setArtists] = useState();
  useEffect(() => {
    const FETCH_URL = `https://api.spotify.com/v1/artists/${
      props.match.params.id
    }/related-artists`;

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
        const artists = !json.error ? json.artists : null;
        setArtists(artists);
      });
  }, []);
  console.log(artists);

  return (
    <div>
      <ul>
        {artists &&
          artists.map(artist => (
            <li>
              <a href={`/search/${artist.name}`}>{artist.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
