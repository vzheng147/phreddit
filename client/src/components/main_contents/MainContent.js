import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import PostDetailPage from "./PostDetailPage";
import Banner from "../banner/Banner";
import CreatePostPage from "./CreatePostPage";
import CommunityPage from "./CommunityPage";
import SearchResultPage from "./SearchResultPage";
import CreateCommunityPage from "./CreateCommunityPage";
import CreateCommentPage from "./CreateCommentPage";

import { Context } from "../../contexts";

const MainContent = () => {
  const [currentRoute, setCurrentRoute] = useState("/home");
  const [previousRoute, setPreviousRoute] = useState("");
  const [linkFlairs, setLinkFlairs] = useState([]);

  useEffect(() => {
    console.log("Current route: ", currentRoute);
    console.log("All posts:", allPosts);
    console.log("All community", communities);
    console.log("All comments", comments);
  }, [currentRoute]);
  // state for home page
  const [allPosts, setAllPosts] = useState([]);
  // state for post detail page
  const [selectedPostId, setSelectedPostId] = useState("");
  // state for new post page
  const [communities, setCommunities] = useState([]);
  const [comments, setComments] = useState([]);
  // state for managing root that comment is added to
  const [commentRoot, setCommentRoot] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [targetCommunity, setTargetCommunity] = useState("");
  const [keywords, setKeywords] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("newest");

  useEffect(() => {
    // get requests
    axios
      .get("http://localhost:8000/api/linkflairs")
      .then(({ data }) => {
        setLinkFlairs(data);
        console.log("linkflairs", data);
        // get linkflairs
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    // get all comments
    axios
      .get("http://localhost:8000/api/comments")
      .then(({ data }) => {
        setComments(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addNewPost = async (post, communityID) => {
    const postedDate = new Date();
    try {
      const response = await axios.post("http://localhost:8000/api/posts", {
        post: {
          ...post,
          postedDate,
        },
        community: communityID,
      });
      const { post: newPost } = response.data;
      setAllPosts([newPost, ...allPosts]);
      await axios
        .get("http://localhost:8000/api/communities")
        .then(({ data }) => {
          // update community so new posts can be found in target community.
          setCommunities(data);
        });

      navigate("/home");
    } catch (e) {
      alert(`${e.response.data.message} ${e.response.data.error}`);
    }

    // go back to the home page
  };

  const addNewCommunity = async (community, communityCreator) => {
    const startDate = new Date();
    community.members.push(communityCreator);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/communities",
        {
          community: {
            ...community,
            startDate,
          },
        }
      );

      const newCommunity = response.data.community;

      await axios
        .get("http://localhost:8000/api/communities")
        .then(({ data }) => {
          setCommunities(data);
        });
      setRelatedPosts([]); // wipe out existing related posts;
      setTargetCommunity(newCommunity);
      navigate("/community");
    } catch (e) {
      alert(`${e.response.data.message} ${e.response.data.error}`);
    }
  };

  const navigate = (path) => {
    setCurrentRoute(path);
  };

  return (
    <Context.Provider
      value={{
        allPosts,
        comments,
        setAllPosts,
        selectedPostId,
        setSelectedPostId,
        navigate,
        setCommunities,
        communities,
        linkFlairs,
        setLinkFlairs,
        addNewPost,
        currentRoute,
        relatedPosts,
        setRelatedPosts,
        commentRoot,
        setCommentRoot,
        setComments,
        targetCommunity,
        setTargetCommunity,
        keywords,
        setKeywords,
        searchTerm,
        setSearchTerm,
        sortMode,
        setSortMode,
        addNewCommunity,
        previousRoute,
        setPreviousRoute,
      }}
    >
      <Banner navigate={navigate} />
      <section className="row main_contents_container">
        <NavBar />
        <div className="main_contents">
          {currentRoute === "/home" ? <Homepage /> : null}
          {currentRoute === "/post_detail" ? <PostDetailPage /> : null}
          {currentRoute === "/create_post" ? <CreatePostPage /> : null}
          {currentRoute === "/community" ? <CommunityPage /> : null}
          {currentRoute === "/search_results" ? <SearchResultPage /> : null}
          {currentRoute === "/create_community" ? (
            <CreateCommunityPage />
          ) : null}
          {currentRoute === "/create_comment" ? <CreateCommentPage /> : null}
        </div>
      </section>
    </Context.Provider>
  );
};

export default MainContent;
