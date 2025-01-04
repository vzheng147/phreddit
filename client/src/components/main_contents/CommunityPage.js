import React, { useContext, useEffect } from "react";
import SortButtons from "./SortButtons";
import { Context } from "../../contexts";
import "./stylesheets/communitypage.css";
import Post from "./Post";

import {
  sort_posts_date_newest,
  sort_posts_date_oldest,
  sort_posts_date_active,
  format_time,
} from "../../helpers";

const CommunityPage = () => {
  const props = useContext(Context);
  const {
    relatedPosts,
    setRelatedPosts,
    comments,
    setSelectedPostId,
    navigate,
    communities,
    linkFlairs,
    targetCommunity,
    sortMode,
    setSortMode,
    setPreviousRoute,
  } = props;

  useEffect(() => {
    sort_posts_by_newest();
    setSortMode("newest");
    setPreviousRoute("/community");
    // upon loading, order all the posts in newest order
  }, [targetCommunity]);

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
    <>
      <header className="community_page_header column">
        <h2 className="community_sub_head row">{`r/${targetCommunity.name}`}</h2>
        <div className="community_description">
          {targetCommunity.description}
        </div>
        <div className="community_create">
          {`Created: ${format_time(new Date(targetCommunity.startDate))}`}
        </div>
        <div className="community_sort_btns row">
          <h3>{`${relatedPosts.length} Posts  •  ${targetCommunity.memberCount} Members`}</h3>

          <SortButtons
            sortMode={sortMode}
            setSortMode={setSortMode}
            sortByNewest={sort_posts_by_newest}
            sortByOldest={sort_posts_by_oldest}
            sortByActive={sort_posts_by_active}
          />
        </div>
      </header>

      <div
        className="posts"
        style={{
          backgroundColor: "#EEF7FF",
          width: "100%",
          height: "70%",
          marginTop: "0",
          padding: "0 5%",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License -
      https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path
                d="M88
      0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0
      13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112
      24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43
      96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5
      48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1
      73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5
      47.7 224 40.1 224 24z"
              />
            </svg>
            <p> The community is chilling ~ </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunityPage;
