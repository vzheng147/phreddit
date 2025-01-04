import React, { useState } from "react";
import "./stylesheets/sortbuttons.css";

const SortButtons = (props) => {
  const { sortMode, setSortMode, sortByNewest, sortByOldest, sortByActive } =
    props;

  return (
    <div className="sort_btn_container row">
      <button
        name="newest_sort"
        className={`sort_btn ${sortMode === "newest" ? "focus_sort" : ""}`}
        onClick={(e) => {
          setSortMode("newest");
          sortByNewest();
        }}
      >
        Newest
      </button>
      <button
        name="oldest_sort"
        className={`sort_btn ${sortMode === "oldest" ? "focus_sort" : ""}`}
        onClick={(e) => {
          setSortMode("oldest");
          sortByOldest();
        }}
      >
        Oldest
      </button>
      <button
        name="active_sort"
        className={`sort_btn ${sortMode === "active" ? "focus_sort" : ""}`}
        onClick={(e) => {
          setSortMode("active");
          sortByActive();
        }}
      >
        Active
      </button>
    </div>
  );
};

export default SortButtons;
