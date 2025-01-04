import React, { useEffect, useContext } from "react";
import axios from "axios";
import SortButtons from "./SortButtons";
import Post from "./Post";
import "./stylesheets/homepage.css";
import { Context } from "../../contexts";
import {
  sort_posts_date_newest,
  sort_posts_date_oldest,
  sort_posts_date_active,
} from "../../helpers";

const Homepage = () => {
  const props = useContext(Context);
  console.log("props", props);
  const {
    allPosts,
    comments,
    setAllPosts,
    setSelectedPostId,
    navigate,
    communities,
    linkFlairs,
    sortMode,
    setSortMode,
    setPreviousRoute,
  } = props;

  useEffect(() => {
    setSortMode("newest");
    setPreviousRoute("/home");
    axios
      .get("http://localhost:8000/api/posts")
      .then(({ data }) => {
        setAllPosts(sort_posts_date_newest(data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const sort_posts_by_newest = () => {
    setAllPosts(sort_posts_date_newest(allPosts));
  };
  const sort_posts_by_oldest = () => {
    setAllPosts(sort_posts_date_oldest(allPosts));
  };
  const sort_posts_by_active = () => {
    setAllPosts(sort_posts_date_active(allPosts, comments));
  };
  return (
    <>
      <header className="all_post_header row">
        <nav className="all_post_header_nav row">
          <h2 id="sub_header">All Posts</h2>
          <SortButtons
            sortMode={sortMode}
            setSortMode={setSortMode}
            sortByNewest={sort_posts_by_newest}
            sortByOldest={sort_posts_by_oldest}
            sortByActive={sort_posts_by_active}
          />
        </nav>
      </header>
      <h3>{`${allPosts.length} Posts`}</h3>
      <div className="posts">
        {allPosts.map((post, index) => {
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
        })}
      </div>
    </>
  );
};

export default Homepage;
