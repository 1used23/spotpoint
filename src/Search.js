import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Albums from "./Albums";
import RelatedArtists from "./RelatedArtists";
import token from "./token";

export default function Search(props) {
  const [info, setInfo] = useState();

  useEffect(() => {
    const FETCH_URL = `https://api.spotify.com/v1/search?q=${
      props.match.params.query
    }&type=artist&limit=1`;

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
        const info = !json.error ? json.artists.items[0] : null;
        setInfo(info);
      });
  }, []);

  const idArtist = info && info.id;

  return (
    <div>
      <img src={info && info.images[0].url} />

      <a href={info && info.external_urls.spotify}>
        <h2> {info && info.name} </h2>
      </a>
      <div> {info && "Followers:" + info.followers.total} </div>
      <div> {info && "Popularity level: " + info.popularity} </div>
      <ul> {info && info.genres.map(genre => <li key={genre}>{genre}</li>)}</ul>
      <Router>
        {info && (
          <Link to={`/albums/${idArtist}`} target="_blank">{`${
            info.name
          } Albums`}</Link>
        )}
        <Link to={`/related/${idArtist}`} target="_blank">
          RelatedArtists
        </Link>
        <Route path="/albums/:id" component={Albums} />
        <Route path="/related/:id" component={RelatedArtists} />
      </Router>
    </div>
  );
}
