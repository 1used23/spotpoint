import React, { useState, useEffect } from "react";

export default function Fetch(url, token, set, id, distr) {
  useEffect(() => {
    const FETCH_URL = url;

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
        distr ? set(info[distr]) : set(info);
      });
  }, [id]);
}
