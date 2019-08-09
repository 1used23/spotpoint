import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "./Search";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          onChange={e => {
            setQuery(e.target.value);
          }}
          placeholder="Search for..."
          className="input"
        />

        <a className="btn" href={query && `/search/${query}`}>
          Go!
        </a>
      </div>

      {/*   похожих артистов?
            альбомы
              треки с альбомов
      */}
      <Router>
        <Route path="/search/:query" component={Search} />
      </Router>
    </div>
  );
}

export default App;
