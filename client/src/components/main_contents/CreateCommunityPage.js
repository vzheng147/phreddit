import React, { useState, useContext } from "react";
import { Context } from "../../contexts";
import "./stylesheets/createcommunity.css";

const initialState_community = {
  communityID: "",
  name: "",
  description: "",
  postIDs: [],
  startDate: "",
  members: [],
  memberCount: 0,
};

const CreateCommunityPage = () => {
  const props = useContext(Context);
  const { addNewCommunity, communities } = props;
  const [newCommunity, setNewCommunity] = useState(initialState_community);
  const [communityCreator, setCommunityCreator] = useState("");

  const updateNewCommunity = (event) => {
    setNewCommunity({
      ...newCommunity,
      [event.target.name]: event.target.value,
    });
  };

  const updateCommunityCreator = (event) => {
    setCommunityCreator(event.target.value);
  };

  const submitCommunity = (event) => {
    event.preventDefault();

    let check = true;
    // Validation checks for empty fields
    if (!newCommunity.name.trim()) {
      alert("Community name cannot be empty!");
      check = false;
    }
    if (!newCommunity.description.trim()) {
      alert("Community description cannot be empty!");
      check = false;
    }
    if (!communityCreator.trim()) {
      alert("Username cannot be empty!");
      check = false;
    }
    if (
      communities.filter(
        (c) => c.name.toLowerCase() === newCommunity.name.trim().toLowerCase()
      ).length !== 0
    ) {
      alert(
        `The community name ${newCommunity.name} is already been taken, try another one!`
      );
      check = false;
    }
    if (!check) {
      return;
    }
    addNewCommunity(
      { ...newCommunity, name: newCommunity.name.trim() },
      communityCreator.trim()
    );

    setNewCommunity(initialState_community);
  };

  return (
    <form className="column new_community_form" onSubmit={submitCommunity}>
      <h2>Creating New Community</h2>
      <p>All * Input Fields Are Required</p>
      <label className="column">
        Community Name *
        <input
          className="new_community_name_input"
          name="name"
          type="text"
          maxLength="100"
          value={newCommunity.name}
          onChange={updateNewCommunity}
        />
      </label>
      <label className="column">
        Community Description *
        <textarea
          id="new_community_description_input"
          name="description"
          maxLength="500"
          value={newCommunity.description}
          onChange={updateNewCommunity}
        ></textarea>
      </label>
      <label className="column">
        Username *
        <input
          className="new_community_user_input"
          type="text"
          value={communityCreator}
          onChange={updateCommunityCreator}
        />
      </label>
      <button type="submit">Engender Community</button>
    </form>
  );
};

export default CreateCommunityPage;
