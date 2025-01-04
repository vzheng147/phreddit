import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import SortButtons from "./SortButtons";
import { Context } from "../../contexts";
import {
  sort_posts_date_active,
  sort_posts_date_newest,
  sort_posts_date_oldest,
} from "../../helpers";

const SearchResultPage = () => {
  const props = useContext(Context);

  const {
    relatedPosts,
    setRelatedPosts,
    comments,
    linkFlairs,
    navigate,
    setSelectedPostId,
    communities,
    setKeywords,
    searchTerm,
    sortMode,
    setSortMode,
    setPreviousRoute,
  } = props;

  useEffect(() => {
    sort_posts_by_newest();
    setKeywords("");
    setPreviousRoute("/search_results");
    // upon loading, order all the posts in newest order
  }, [searchTerm]);

  const sort_posts_by_newest = () => {
    setRelatedPosts(sort_posts_date_newest(relatedPosts));
  };
  const sort_posts_by_oldest = () => {
    setRelatedPosts(sort_posts_date_oldest(relatedPosts));
  };
  const sort_posts_by_active = () => {
    setRelatedPosts(sort_posts_date_active(relatedPosts, comments));
  };

  return (
    <div>
      <header className="search_results_header row">
        <nav className="search_results_nav row">
          <h2 id="sub_header">
            {relatedPosts.length === 0
              ? "No results found for: "
              : "Results for: "}
            {searchTerm}
          </h2>
          <SortButtons
            sortMode={sortMode}
            setSortMode={setSortMode}
            sortByNewest={sort_posts_by_newest}
            sortByOldest={sort_posts_by_oldest}
            sortByActive={sort_posts_by_active}
          />
        </nav>
      </header>
      <h3>{`${relatedPosts.length} Posts`}</h3>
      <div className="posts">
        {relatedPosts.length !== 0 ? (
          relatedPosts.map((post, index) => {
            return (
              <div key={post.postID}>
                {index !== 0 ? <hr className="post_delimiter"></hr> : null}
                <Post
                  post={post}
                  comments={comments}
                  linkFlairs={linkFlairs}
                  communities={communities}
                  setSelectedPostId={setSelectedPostId}
                  navigate={navigate}
                />
              </div>
            );
          })
        ) : (
          <div className="no_content_alert column" style={{ height: "50%" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License -
  https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path
                d="M64
  32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112
  0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7
  0 45.3 32-32 64-64 32-32z"
              />
            </svg>
            <p> No posts are related to the keywords ~ </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
