import React, { useEffect, useContext } from "react";
import { Context } from "../../contexts";
import { searchKeywords } from "../../helpers";

const Banner = () => {
  const props = useContext(Context);
  const {
    navigate,
    currentRoute,
    allPosts,
    setRelatedPosts,
    comments,
    keywords,
    setKeywords,
    setSearchTerm,
    setSortMode,
  } = props;

  useEffect(() => {
    console.log(keywords);
  }, [keywords]);

  const phredditOnClick = (e) => {
    e.preventDefault();
    navigate("/home");
    // change the route to home page
  };
  const createPostOnClick = (e) => {
    navigate("/create_post");
    // change the route to create post page
  };
  const search = (e) => {
    if (keywords.trim().length === 0) {
      // case the user enters empty spaces
      alert("Please enter valid keywords");
      setKeywords("");
      return;
    }
    const terms = keywords.toLowerCase().split(" ");

    setRelatedPosts(
      allPosts.filter((p) => {
        const titleMatches = p.title
          .toLowerCase()
          .split(" ")
          .some((v) => terms.includes(v));

        const contentMatches = p.content
          .toLowerCase()
          .split(" ")
          .some((v) => terms.includes(v));

        const keywordsMatch = searchKeywords(p, terms, comments);

        return titleMatches || contentMatches || keywordsMatch;
      })
    );
    setSortMode("newest");
    setSearchTerm(keywords);
    navigate("/search_results");
  };
  return (
    <header className="banner row">
      <div className="header row">
        <h1 id="phreddit_logo" alt="phreddit logo" onClick={phredditOnClick}>
          phreddit
        </h1>
      </div>
      <input
        id="banner_search_input"
        placeholder="Search Phreddit"
        value={keywords}
        onChange={(e) => {
          setKeywords(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && keywords.length !== 0) search(keywords);
        }}
      />
      <button
        id="banner_createpost_btn"
        className={`phreddit_theme ${
          currentRoute === "/create_post" ? "focus_btn" : ""
        }`}
        onClick={createPostOnClick}
      >
        Create Post
      </button>
    </header>
  );
};

export default Banner;
