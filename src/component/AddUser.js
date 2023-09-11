import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../counter/PostSlice";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const AddUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state for submission status
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && phone && !isSubmitting) {
      // Prevent multiple submissions
      setIsSubmitting(true);

      try {
        await dispatch(addUsers({ name, email, phone }));
        setName("");
        setEmail("");
        setPhone("");
        alert("Data added successfully");
        navigate("/data-table");
      } catch (error) {
        // Handle any potential errors here
        console.error("Error adding user:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <Container>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="success" type="submit" disabled={isSubmitting}>
            Add User
          </button>
        </form>
      </Container>
    </div>
  );
};

export default AddUser;
