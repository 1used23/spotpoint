import React, { useState, useEffect } from "react";

export default function Albums(props) {
  const [albums, setAlbums] = useState();
  useEffect(() => {
    const FETCH_URL = `https://api.spotify.com/v1/artists/${
      props.match.params.id
    }/albums`;
    console.log(FETCH_URL);

    const accessToken =
      "BQBmu6hO_DALW5V_wBxRannNH89eT2wDXJnz49HLqIiJeQBkvbW2T-ph6YAtAYTa6t4Gm3nyHxzTkqUSnvDwskW6AmVzWg74yO2ETXzcGCvDSWzU1guhhGBdiraudvmIn6sZwPNJ5uSbfF9aG2yFDUiNQlzVEvL2LzPGu5ZGZLFs2NSxqOOrjXGTzOwWwzG-XBJR3ik1lxr2kqphg7P6bXAOGOPB0oC6JcSI10oG7lYY-CMpnpxgog7ffWGC0Fo1SZ_Yx9vzO94h_CuRz5j7tbpGOtqt1OOH";

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

        //const info = !json.error ? json.artists.items[0] : null;
        //setAlbums(info);
      });
  }, []);

  console.log(albums);

  return <div>{props.match.params.id}</div>;
}
