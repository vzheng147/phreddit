import React, { useState, useEffect } from "react";
import axios from "axios";

const AddLinkFlairModal = (props) => {
  const { updateNewPost, newPost, linkFlairs, setLinkFlairs } = props;
  useEffect(() => {
    console.log(linkFlairs);
  });

  const [newLinkFlair, setNewLinkFlair] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setNewLinkFlair("");
    setOpen(false);
  };
  const addNewTag = (e) => {
    const theLinkFlair = newLinkFlair.trim();
    if (theLinkFlair.length === 0) {
      alert("The new linkflair can't be empty spaces");
      return;
    }

    axios
      .post("http://localhost:8000/api/linkflairs", {
        linkFlair: theLinkFlair,
      })
      .then((res) => {
        e.target.name = "linkFlairID";
        e.target.value = res.data.newLinkFlair._id;
        updateNewPost(e);
        setNewLinkFlair("");
        setLinkFlairs([...linkFlairs, res.data.newLinkFlair]);
        handleClose();
      })
      .catch((error) => {
        alert(error.response.data.message);
        setNewLinkFlair("");
      });
  };

  const handleChange = (e) => {
    setNewLinkFlair(e.target.value);
  };

  return (
    <div>
      <button
        className="open_modal_btn row"
        style={{ color: "#ffffff", backgroundColor: "#86D293" }}
        onClick={handleOpen}
      >
        {newPost.linkFlairID !== ""
          ? linkFlairs.filter((tag) => newPost.linkFlairID === tag._id)[0]
              .content
          : "Add Tag"}
      </button>
      <div
        id="new_linkflair_modal"
        className={`${open ? "visible" : "hide"}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <input
          className="new_tag_input"
          value={newLinkFlair}
          placeholder="New Tag"
          maxLength={30}
          onChange={handleChange}
        />
        <div className="linkFlairs_options column">
          {linkFlairs.map((linkFlair) => {
            return (
              <button
                className="linkFlairs_options_btn"
                key={linkFlair._id}
                name="linkFlairID"
                value={linkFlair._id}
                onClick={(e) => {
                  e.preventDefault();
                  updateNewPost(e);
                  handleClose();
                }}
              >
                {linkFlair.content}
              </button>
            );
          })}
        </div>
        <div className="linkFlairs_modal_btns row">
          <button
            className="linkFlairs_modal_action_btn warning_theme"
            style={{
              backgroundColor: "#FF4C4C",
              color: "#ffffff",
            }}
            name="linkFlairID"
            value=""
            onClick={(e) => {
              e.preventDefault();
              updateNewPost(e);
              handleClose();
            }}
          >
            Removed Tag
          </button>
          <div className="row">
            <button
              className="linkFlairs_modal_action_btn"
              style={{
                backgroundColor: "#EEEEEE",
                color: "#000",
              }}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="linkFlairs_modal_action_btn"
              style={{
                backgroundColor: "#D1E9F6",
                color: "#000",
              }}
              onClick={(e) => {
                e.preventDefault();
                addNewTag(e);
              }}
            >
              Add New Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkFlairModal;
