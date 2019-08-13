import React, { useState, useEffect } from "react";
import token from "../token";
import Tracklist from "../Tracklist/Tracklist";
import Fetch from "../fetch";

export default function Albums({ id }) {
  const [albums, setAlbums] = useState();
  const FETCH_URL = `https://api.spotify.com/v1/artists/${id}/albums`;

  Fetch(FETCH_URL, token, setAlbums, id);

  let albumsArr = [];
  let coversArr = [];
  let idArr = [];

  albums &&
    albums.items.map(album => {
      if (!albumsArr.includes(album.name) && album.album_type === "album") {
        albumsArr.push(album.name);
        coversArr.push(album.images[0].url);
        idArr.push(album.id);
      }
    });

  /*     albumsArr.push({
        name: album.name,
        cover: album.images[0],
        id: 
      }])
   */
  return (
    <div>
      <ul className="albums">
        {albumsArr &&
          albumsArr.map((album, index) => (
            <li key={album}>
              <h3>{album}</h3>
              <img src={coversArr[index]} />
              <Tracklist id={idArr[index]} />
            </li>
          ))}
      </ul>
      <br />
    </div>
  );
}
