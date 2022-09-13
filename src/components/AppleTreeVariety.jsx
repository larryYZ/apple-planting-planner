import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppleTreeVariety(props) {
  let params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fruit-trees-api.herokuapp.com/appleTrees/${params.appleTreeVariety}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [params.appleTreeVariety]);

  return (
    <main style={{ padding: "1rem" }}>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <div>
          <h2>Apple Tree Variety: {data.variety}</h2>
          <p>Zone: {data.zone}</p>
          <p>Taste: {data.taste}</p>
          <p>Bloom Time: {data.bloom}</p>
          <p>Harvest Time: {data.harvest}</p>
        </div>)}
    </main>
  
  );
}
