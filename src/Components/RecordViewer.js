import React, { useEffect, useState } from "react";
import axios from "axios";
import "../static/recordViewer.css";
import backBtn from "../static/images/back-btn.png";
import backBtnFocus from "../static/images/back-btn-focus.png";

export default function RecordViewer({ playerId, closeViewer }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [gameRecords, setGameRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryType, setQueryType] = useState("all");
  const [activeMode, setActiveMode] = useState("all");
  const [sortField, setSortField] = useState("score");
  const [sortDirection, setSortDirection] = useState("asc");

  // useEffect makes it so list of scores shown when this component mounts
  useEffect(() => {
    displayRecords();
  }, [queryType, page, size, sortField, sortDirection]);

  function displayRecords() {
    if (queryType === "all") {
      displayAllRecords();
    } else if (queryType === "user-specific") {
      displayUserSpecificRecords(playerId);
    }
  }

  // Function to fetch all records in DB
  function displayAllRecords() {
    axios
      .get(
        `https://wheelofortune.wl.r.appspot.com/findAllRecordsByPage?page=${page}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
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
  function displayUserSpecificRecords(usrId) {
    axios
      .get(
        `https://wheelofortune.wl.r.appspot.com/findByIdByPage?userId=${usrId}&page=${page}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
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
        displayRecords();

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

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  return (
    <div className="record-viewer">
      <div className="query-mode">
        <button
          onClick={() => {
            setPage(0);
            setActivePage(0);
            setQueryType("all");
            setActiveMode("all");
          }}
          className={activeMode === "all" ? "active-mode" : ""}
        >
          All Records
        </button>
        <button
          onClick={() => {
            setPage(0);
            setActivePage(0);
            setQueryType("user-specific");
            setActiveMode("user-specific");
          }}
          className={activeMode === "user-specific" ? "active-mode" : ""}
        >
          Your Records
        </button>
      </div>
      <div className="records-list">
        <div className="sort-options">
          <label htmlFor="sort-field-selection">Sort by </label>
          <select
            id="sort-field-selection"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="score">score</option>
            <option value="playDate">date</option>
          </select>
          <label htmlFor="sort-direction-selection">Order </label>
          <select
            id="sort-direction-selection"
            value={sortDirection}
            onChange={handleSortDirectionChange}
          >
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </div>
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

      <img
        src={backBtn}
        className="back-btn"
        onClick={closeViewer}
        onMouseOver={(e) => (e.target.src = backBtnFocus)}
        onMouseOut={(e) => (e.target.src = backBtn)}
        draggable={false}
      ></img>
    </div>
  );
}
