import React, { useEffect, useState } from "react";
import axios from "axios";
import "../static/recordViewer.css";

export default function RecordViewer({ playerId, closeViewer }) {
  const [gameRecords, setGameRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryType, setQueryType] = useState("all");

  // useEffect makes it so list of scores shown when this component mounts
  useEffect(() => {
    if (queryType === "all") {
      displayAllRecords();
    } else if (queryType === "user-specific") {
      displayUserSpecificRecords(playerId);
    }
  }, [queryType]);

  // Function to fetch all records in DB
  function displayAllRecords() {
    axios
      .get(`https://wheelofortune.wl.r.appspot.com/findAllRecords`)
      .then((response) => {
        setGameRecords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  // Function to fetch user-specific records
  function displayUserSpecificRecords(usrId) {
    axios
      .get(`https://wheelofortune.wl.r.appspot.com/findById?userId=${usrId}`)
      .then((response) => {
        setGameRecords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  const handleDelete = async (recordId) => {
    axios
      .delete(
        `https://wheelofortune.wl.r.appspot.com/deleteByRecordId?recordId=${recordId}`
      )
      .then(() => {
        if (queryType === "all") {
          displayAllRecords();
        } else if (queryType === "user-specific") {
          displayUserSpecificRecords(playerId);
        }
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="record-viewer">
      <div className="back-to-game">
        <button onClick={closeViewer}>back</button>
      </div>
      <div className="view-options">
        <button onClick={() => setQueryType("all")}>All Records</button>
        <button onClick={() => setQueryType("user-specific")}>
          Your Records
        </button>
      </div>
      <div className="records-list">
        {gameRecords.map((record) => (
          <div key={record.id} className="record">
            recordId: {record.id}, playerId: {record.player.userId},{" "}
            {record.player.name}, score:
            {record.score}
            {record.player.userId === playerId && (
              <button onClick={() => handleDelete(record.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
