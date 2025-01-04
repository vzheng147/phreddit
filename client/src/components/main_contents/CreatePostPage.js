import React, { useState, useContext, useEffect } from "react";
import "./stylesheets/createpostpage.css";
import AddLinkFlairModal from "../modals/AddLinkFlairModal";
import { Context } from "../../contexts";

const initialState_Post = {
  // postID: "",
  title: "",
  content: "",
  linkFlairID: "",
  postedBy: "",
  postedDate: "",
  commentIDs: [],
  views: 0,
  communityID: "",
};

const CreatePostPage = () => {
  console.log("CreatePostPage is rendered");
  const props = useContext(Context);
  const { communities, addNewPost, linkFlairs, setLinkFlairs } = props;
  const [newPost, setNewPost] = useState(initialState_Post);

  useEffect(() => {
    console.log(newPost);
  }, [newPost]);

  const updateNewPost = (event) => {
    // update the input
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const submitPost = (event) => {
    event.preventDefault();

    let check = true;
    if (!newPost.communityID) {
      alert("Must select a community to proceed!");
      check = false;
    }
    if (!newPost.title) {
      alert("Title cannot be empty!");
    }
    if (!newPost.content) {
      alert("Content cannot be empty!");
    }
    if (!newPost.postedBy) {
      alert("Username cannot be empty!");
    }
    if (!check) {
      return;
    }
    addNewPost(newPost, newPost.communityID);
    setNewPost(initialState_Post);
    // reset the state once the form is submit;
  };

  return (
    <form className="new_post_form column" onSubmit={submitPost}>
      <select
        className="new_post_community_input"
        value={newPost.communityID}
        onChange={updateNewPost}
        name="communityID"
      >
        <option value={""}>Select Community</option>
        {communities.map((community) => {
          return (
            <option
              key={community.communityID}
              value={community._id}
              name="community"
            >
              {community.name}
            </option>
          );
        })}
      </select>
      <input
        className="new_post_title"
        value={newPost.title}
        placeholder="Title"
        name="title"
        maxLength="100"
        onChange={updateNewPost}
      />
      <AddLinkFlairModal
        linkFlairs={linkFlairs}
        setLinkFlairs={setLinkFlairs}
        updateNewPost={updateNewPost}
        newPost={newPost}
      />
      <textarea
        name="content"
        className="new_post_body"
        value={newPost.content}
        onChange={updateNewPost}
      ></textarea>
      <input
        className="new_post_author_input"
        value={newPost.postedBy}
        placeholder="Username"
        name="postedBy"
        onChange={updateNewPost}
      />
      <button className="submit_new_post_btn" type="submit">
        Submit Post
      </button>
    </form>
  );
};

export default CreatePostPage;
