import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Search from "./Search";
import RelatedArtists from "./RelatedArtists";

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
      </div>

      <Router>
        <Link className="btn" to={`/search/${query}`}>
          Go!
        </Link>
        <Route path="/search/:query" component={Search} />
        <Route path="/related/:id" component={RelatedArtists} />
      </Router>
    </div>
  );
}

export default App;
