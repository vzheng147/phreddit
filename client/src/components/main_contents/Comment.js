import React, { useContext } from "react";
import { Context } from "../../contexts";
import { format_time } from "../../helpers";
import userIcon from "../../imgs/userIcon.svg";

const Comment = (props) => {
  const propsFromContext = useContext(Context);
  const { commentID } = props;
  const { comments, setCommentRoot, navigate } = propsFromContext;
  const comment = comments.find((item) => item._id === commentID);

  const addComment = (e) => {
    setCommentRoot(commentID);
    navigate("/create_comment");
  };
  if (!comment) {
    return null; // or return <div>Comment not found</div>;
  }

  const { commentedBy, commentedDate, content } = comment;
  return (
    <div className="column comment_container">
      <p className="comment_username_postedDate row">
        <img className="user_icon" src={userIcon} />
        {commentedBy}
        <span className="time_stamp">{`• ${format_time(commentedDate)}`}</span>
      </p>
      <p className="comment_content">{`${content}`}</p>
      <button onClick={addComment} className="comment_reply_button row">
        Reply
      </button>
      {comment.commentIDs.length > 0 &&
        comment.commentIDs.map((childCommentID) => (
          <Comment key={childCommentID} commentID={childCommentID} />
        ))}
    </div>
  );
};

export default Comment;
