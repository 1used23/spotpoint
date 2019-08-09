import React, { useState, useEffect } from "react";

export default function Albums(props) {
  const [albums, setAlbums] = useState();
  useEffect(() => {
    const FETCH_URL = `https://api.spotify.com/v1/artists/${
      props.match.params.id
    }/albums`;
    console.log(FETCH_URL);

    const accessToken =
      "BQBbU7uAeBJRUcurvKCFFLiddV0Am_sqXoQKk1MHpDaLk-1KTpHIaG7bTR-76QP7BggMO2r9LuyShS0vDTeoGH0x-py81allVLyMYG23yFMGtak1S2GMz3RRTxy3kreVsKEXzrrGDxg0BiAsZWB9bcP2_yHhBiVCHKCKufBRkaG_UitQhzSM";

    const myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "no-cache"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);

        const info = !json.error ? json : null;
        setAlbums(info);
      });
  }, []);

  console.log(albums);

  let albumsArr = [];

  albums &&
    albums.items.map(album => {
      !albumsArr.includes(album.name) && albumsArr.push(album.name);
    });

  return (
    <div>
      <ul>{albumsArr && albumsArr.map(album => <li> {album} </li>)}</ul>
    </div>
  );
}
