import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ArtistInfo from './ArtistInfo';
import TestRout from './TestRout'

function App() {

  const [query, setQuery] = useState('');
  const [artist, setArtist] = useState(null);

  const search = () => {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + query + '&type=artist&limit=1';
    const accessToken = 'BQAGVFKgsr6guWESoQu5T-8jcNd8KFTd5uI4gg2Qm5ssWk23s9LAC7Vx6ud1WyTGu32NnUJrRUEEd6E5Mgv2oLZnTU652xTCg2KdXf_aNPVSjxlKOQO8UCQRLmfra_QEZlqHAowN3D1gCY_UvL7cyCen5_XApn5qYEnZ4ZlMNLEq5D3QLlRJ6T_-S71ISO_Dxo8zpcEqhKTzC_QyIHoX1kQGv_P6EdbyetNNPyPohVSlQINaWWUQAZ8kz58CLUfIG1DrcK5fEO4TyhFJnbXa7sdtceZ3tthr';

    const myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = !json.error ? json.artists.items[0] : null;
        setArtist(artist);
      })

  }

  return (
    <div className="container">

      <div className="form">
        <input type="text"
          onChange={e => { setQuery(e.target.value) }}
          placeholder="Search for..." className="input" />

        <a className="btn" onClick={e => { search(query) }}>Go!</a>
      </div>

      {artist && <ArtistInfo info={artist} />}

      {/* передавать query в роут /search q=... и в нем вызывать компонент с запросом
          выводим инфу об артисте
            похожих артистов?
            альбомы
              треки с альбомов
            топ треки
              инфу о треке
      */}
      <Router>
        <Route path="/test" component={TestRout} />
      </Router>


    </div>
  )
}

export default App;