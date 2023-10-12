import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import "./MyNotes.css";
import Masonry from "react-masonry-css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import "./../../toastifyCustomStyles.css";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(false);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/del/${id}`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Note Deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        fetchNotes(); // Reload the notes after a successful deletion
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("An error occurred while deleting the note.");
    }
  };

  const loginInfo = window.localStorage.getItem("userLogin");
  // converting string data to JSON
  const userData = JSON.parse(loginInfo);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${userData._id}`
      );

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <MainScreen>
        <h3>Welcome to Notes App, {userData.name}</h3>

        <Link to="/mynotes/createNote">
          <button className="createButton">Create</button>
        </Link>

        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        {notes.length === 0 ? (
          <p className="no-notes-message">
            No notes present. Create a new note to get started!
          </p>
        ) : (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {notes.map((note) => (
              <div key={note._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {note.category}
                    </Card.Subtitle>
                    <Card.Text>{note.content}</Card.Text>
                    <div>
                      <Link to={`/mynotes/editNote/${note._id}`}>
                        <EditIcon style={{ color: "#1a2456" }} />
                      </Link>

                      <DeleteIcon
                        style={{ color: "#d62929", cursor: "pointer" }}
                        onClick={() => deleteHandler(note._id)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Masonry>
        )}
      </MainScreen>
    </Container>
  );
};

export default MyNotes;
