import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Albums from "./Albums";
import token from './token'

export default function Search(props) {
  const [info, setInfo] = useState();

  const [artist, setArtist] = useState(props.match.params.query);

  useEffect(() => {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const FETCH_URL = BASE_URL + "q=" + artist + "&type=artist&limit=1";

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
      <img
        src={info && info.images[0].url}
        height="400"
        width="400"
        className="photo"
      />

      <a href={info && info.external_urls.spotify}>
        {" "}
        <h2> {info && info.name} </h2>{" "}
      </a>
      <div> {info && "Followers:" + info.followers.total} </div>
      <div> {info && "Popularity level: " + info.popularity} </div>
      <ul> {info && info.genres.map(genre => <li key={genre}>{genre}</li>)}</ul>
      <Router>
        {info && (
          <Link to={`/albums/${idArtist}`}>{`${info.name} Albums`}</Link>
        )}
        <Route path="/albums/:id" component={Albums} />
      </Router>
    </div>
  );
}
