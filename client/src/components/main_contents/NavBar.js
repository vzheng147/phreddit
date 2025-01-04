import React, { useContext, useEffect } from "react";
import { Context } from "../../contexts";
import axios from "axios";

const NavBar = () => {
  const props = useContext(Context);
  const {
    setCommunities,
    communities,
    navigate,
    currentRoute,
    setRelatedPosts,
    targetCommunity,
    setTargetCommunity,
  } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/communities")
      .then(({ data }) => {
        setCommunities(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const navigateToCommunity = (e, communityID) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/communities/${communityID}`)
      .then(({ data }) => {
        setRelatedPosts(data);
        navigate("/community");
        setTargetCommunity(
          communities.find((community) => community._id === communityID)
        );
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  const navigateToCreateCommunity = (e) => {
    e.preventDefault();
    navigate("/create_community");
  };
  return (
    <nav className="main_content_nav column">
      <a
        className={`nav_link_home row phreddit_theme ${
          currentRoute === "/home" ? "focus_btn" : ""
        }`}
        href="#"
        onClick={navigateToHome}
      >
        Home
      </a>
      <div className="nav_communities_session_container column">
        <h2 className="nav_communities_session">Communities</h2>
        <button
          className={`nav_create_commnity_btn phreddit_theme ${
            currentRoute === "/create_community" ? "focus_btn" : ""
          }`}
          onClick={navigateToCreateCommunity}
        >
          Create Community
        </button>
        <div id="community_name_btn_container" className="column">
          {communities.map((community) => {
            return (
              <button
                key={community.communityID}
                style={{ borderWidth: "0" }}
                className={`community_name_btn ${
                  targetCommunity.name === community.name &&
                  currentRoute === "/community"
                    ? "focus_community_btn"
                    : ""
                }`}
                onClick={(e) => {
                  navigateToCommunity(e, community._id);
                }}
              >{`r/
              ${
                community.name.length > 20
                  ? `${community.name.slice(0, 20)}...`
                  : `${community.name}`
              }`}</button>
            );
          })}
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default NavBar;
