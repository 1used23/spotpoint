import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Albums from "./Albums";
import RelatedArtists from "./RelatedArtists";
import token from "./token";
import Fetch from "./fetch";

export default function Search(props) {
  const [info, setInfo] = useState();
  const [showAlbums, setShowAlbums] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

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
  }, [props.match.params.query]);

  Fetch();

  const idArtist = info && info.id;
  return info ? (
    <div>
      <img src={info.images[0].url} />

      <a href={info.external_urls.spotify}>
        <h2> {info.name} </h2>
      </a>
      <div> {"Followers:" + info.followers.total} </div>
      <div> {"Popularity level: " + info.popularity} </div>
      <ul>
        {info.genres.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <button
        onClick={e => {
          setShowAlbums(!showAlbums);
        }}
      >
        Show Albums
      </button>

      <button
        onClick={e => {
          setShowRelated(!showRelated);
        }}
      >
        Show Related Artists
      </button>
      {showAlbums && <Albums id={idArtist} />}
      {showRelated && <RelatedArtists id={idArtist} />}
    </div>
  ) : (
    "Какая-то ошибка ¯\\_(ツ)_/¯"
  );
}
