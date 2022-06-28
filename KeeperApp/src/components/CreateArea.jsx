import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Zoom } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [check, setCheck] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function checkEmptyNotes(note) {
    return !Object.values(note).some((x) => x !== null && x !== "");
  }

  function submitNote(event) {
    if (!checkEmptyNotes(note)) {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    }
    event.preventDefault();
  }

  function expandTextArea() {
    setCheck(true);
  }

  function shrinkTextArea() {
    setCheck(false);
  }

  return (
    <ClickAwayListener onClickAway={shrinkTextArea}>
      <form className="create-note">
        {check && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          onClick={expandTextArea}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={check ? 3 : 1}
        />
        <Zoom in={check}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </ClickAwayListener>
  );
}

export default CreateArea;
