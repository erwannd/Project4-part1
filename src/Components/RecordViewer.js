import React, { useEffect, useState } from "react";
import axios from "axios";
import "../static/recordViewer.css";

export default function RecordViewer({ closeViewer }) {
  const [gameRecords, setGameRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryType, setQueryType] = useState("all");

  // useEffect makes it so list of books shown when this component mounts
  useEffect(() => {
    if (queryType === "all") {
      displayAllRecords();
    } else if (queryType === "user-specific") {
    }
  }, [queryType]);

  // Function to get all records in DB
  function displayAllRecords() {
    axios
      .get("https://wheelofortune.wl.r.appspot.com/findAllRecords")
      .then((response) => {
        setGameRecords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="record-viewer">
      <div className="back-to-game">
        <button onClick={closeViewer}>Go back</button>
      </div>
      <div className="records-list">
        {gameRecords.map((record) => (
          <div key={record.id} className="record">
            id: {record.player.userId},{record.player.name}, score:
            {record.score}
          </div>
        ))}
      </div>
    </div>
  );
}
