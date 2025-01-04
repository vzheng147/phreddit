import React, { useState, useContext } from "react";
import "./stylesheets/addcommentpage.css";
import { Context } from "../../contexts";
import back from "../../imgs/goBack.svg";
import axios from "axios";

const initialState_comment = {
  commentID: "",
  content: "",
  commentIDs: [],
  commentedBy: "",
  commentedDate: "",
};

const CreateCommentPage = () => {
  const props = useContext(Context);
  const {
    commentRoot,
    setComments,
    comments,
    navigate,
    allPosts,
    setAllPosts,
  } = props;
  const [newComment, setNewComment] = useState(initialState_comment);

  console.log(commentRoot);
  const updateNewComment = (event) => {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  };

  const submitComment = async (event) => {
    event.preventDefault();
    // check fields
    const newCommentID = `comment${comments.length + 1}`;
    const commentedDate = new Date();
    let check = false;
    if (!newComment.content.trim()) {
      alert("Comment cannot be empty!");
      check = true;
    }
    if (!newComment.commentedBy.trim()) {
      alert("Username cannot be empty!");
      check = true;
    }
    if (check) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/comments", {
        comment: {
          ...newComment,
          commentedDate,
        },
        root: commentRoot,
      });

      await axios.get("http://localhost:8000/api/comments").then(({ data }) => {
        setComments(data);
      });
      await axios.get("http://localhost:8000/api/posts").then(({ data }) => {
        setAllPosts(data);
      });

      setNewComment(initialState_comment);
      navigate("/post_detail");
    } catch (e) {
      alert(`${e.response.data.message} ${e.response.data.error}`);
    }
  };

  return (
    <section id="comment_reply_page">
      <img
        className="goBackBtn"
        src={back}
        alt="direct user to previous page button"
        onClick={() => navigate("/post_detail")}
      />
      <p id="target_text">
        {allPosts.filter((post) => post._id === commentRoot).length === 0
          ? comments.filter((c) => c._id === commentRoot)[0].content
          : allPosts.filter((post) => post._id === commentRoot)[0].content}
      </p>
      <form
        className="comment_reply_form column"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="replier_info_content column">
          Comment:
          <textarea
            className="new_comment_body"
            name="content"
            maxlength="500"
            value={newComment.content}
            onChange={updateNewComment}
          ></textarea>
        </label>

        <label className="replier_info row">
          username:
          <input
            name="commentedBy"
            className="replier_username_input"
            value={newComment.commentedBy}
            onChange={updateNewComment}
          />
        </label>
        <button className="respond_btn" onClick={submitComment}>
          Submit Comment
        </button>
      </form>
    </section>
  );
};

export default CreateCommentPage;
