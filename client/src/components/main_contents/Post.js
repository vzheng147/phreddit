import React, { useContext, useEffect } from "react";
import { Context } from "../../contexts";
import userIcon from "../../imgs/userIcon.svg";
import { format_time, countComment } from "../../helpers";

const Post = (props) => {
  const contextProps = useContext(Context);
  const { currentRoute } = contextProps;
  const {
    post,
    navigate,
    setSelectedPostId,
    communities,
    linkFlairs,
    comments,
  } = props;
  useEffect(() => {
    console.log(post);
  }, []);

  const redirectToPostDetail = () => {
    setSelectedPostId(post._id);
    navigate("/post_detail");
  };

  return (
    <div className="column post_details" onClick={redirectToPostDetail}>
      <div className="post_header_info row">
        {currentRoute !== "/community" ? (
          <>
            <div>
              {communities.map((community) => {
                if (community.postIDs.includes(post.postID)) {
                  return `r/${community.name} `;
                }
                return null;
              })}
            </div>
            <div className="posted_by">
              <img className="user_icon" src={userIcon} />
              {post.postedBy}
              <span className="time_stamp">
                {`• ${format_time(post.postedDate)}`}
              </span>
            </div>
          </>
        ) : (
          <div
            className="posted_by row"
            style={{ margin: "0", alignItems: "center" }}
          >
            <img className="user_icon" src={userIcon} />
            {post.postedBy}
            <span className="time_stamp">
              {` • ${format_time(post.postedDate)}`}
            </span>
          </div>
        )}
      </div>

      <h4 className="post_title">{post.title}</h4>
      <div style={{ margin: "1rem 0" }}>
        {linkFlairs.map((linkFlair, index) => {
          if (post.linkFlairID === linkFlair._id) {
            return (
              <span
                key={index}
                className="post_linkflair"
              >{`#${linkFlair.content}`}</span>
            );
          }
          return null;
        })}
      </div>

      <div className="commnunity_post_content">
        {post.content.length > 80
          ? `${post.content.slice(0, 80)}...`
          : post.content}
      </div>
      <div className="group_views_comments_in_community row">
        <div className="community_views">{`Views: ${post.views}`}</div>
        <div className="community_comments">
          {`Comments: ${countComment(post, comments)}`}
        </div>
      </div>
    </div>
  );
};

export default Post;
