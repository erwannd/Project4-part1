import React, { useEffect, useState } from "react";
import axios from "axios";
import "../static/recordViewer.css";

export default function RecordViewer({ playerId, closeViewer }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [gameRecords, setGameRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryType, setQueryType] = useState("all");

  // This effect runs when queryType changes and sets page & active page to 0
  useEffect(() => {
    console.log("useEffect setPage triggers");
    setPage(0);
    setActivePage(0);
  }, [queryType]);

  // This effect runs when queryType changes. It fetches data based on the new queryType
  useEffect(() => {
    if (queryType === "all") {
      displayAllRecords(page, size);
    } else if (queryType === "user-specific") {
      displayUserSpecificRecords(playerId, page, size);
    }
  }, [queryType]);

  // useEffect makes it so list of scores shown when this component mounts
  useEffect(() => {
    console.log("useEffect 3 dependencies trigger");

    if (queryType === "all") {
      displayAllRecords(page, size);
    } else if (queryType === "user-specific") {
      displayUserSpecificRecords(playerId, page, size);
    }
  }, [page, size]);

  // Function to fetch all records in DB
  function displayAllRecords(page, size) {
    axios
      .get(
        `https://wheelofortune.wl.r.appspot.com/findAllRecordsByPage?page=${page}&size=${size}`
      )
      .then((response) => {
        setGameRecords(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  // Function to fetch user-specific records
  function displayUserSpecificRecords(usrId, page, size) {
    axios
      .get(
        `https://wheelofortune.wl.r.appspot.com/findByIdByPage?userId=${usrId}&page=${page}&size=${size}`
      )
      .then((response) => {
        setGameRecords(response.data.content);
        setTotalPages(response.data.totalPages);
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
          displayAllRecords(page, size);
        } else if (queryType === "user-specific") {
          displayUserSpecificRecords(playerId);
        }
        // Check if current page is empty after deletion. If so, go to previous page
        if (gameRecords.length === 1 && page > 0) {
          setPage((prevPage) => prevPage - 1);
          setActivePage((prevPage) => prevPage - 1);
        }
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="record-viewer">
      <div className="view-options">
        <button onClick={() => setQueryType("all")}>All Records</button>
        <button onClick={() => setQueryType("user-specific")}>
          Your Records
        </button>
      </div>
      <div className="records-list">
        {gameRecords.map((record) => (
          <div key={record.id} className="record">
            playerId: {record.googleId}, score: {record.score}, date:{" "}
            {record.playDate}
            {record.googleId === playerId && (
              <button onClick={() => handleDelete(record.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>

      {/* Display available page numbers */}
      <div className="page-navi">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            className={`page-number ${index === activePage ? "active" : ""}`}
            key={index}
            onClick={() => {
              setPage(index);
              setActivePage(index);
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <div className="back-to-game">
        <button onClick={closeViewer} className="return-btn">
          back
        </button>
      </div>
    </div>
  );
}
