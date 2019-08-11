import React, { useState, useEffect } from "react";
import token from './token';
import Tracklist from './Tracklist';

export default function Albums(props) {
  const [albums, setAlbums] = useState();
  useEffect(() => {
    const FETCH_URL = `https://api.spotify.com/v1/artists/${
      props.match.params.id
      }/albums`;

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

        const info = !json.error ? json : null;
        setAlbums(info);
      });
  }, []);

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
        cover: album.images[0].
      }])
   */
  return (
    <div>
      <ul>
        {albumsArr && albumsArr.map((album, index) => <li key={album}>
          <div>{album}</div>
          <img
            height="400"
            width="400"
            src={coversArr[index]}
          />
          <Tracklist id={idArr[index]} />
        </li>)}
      </ul>
      <br/>>
    </div>
  );
}
