import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUsers, deleteUsers } from "../counter/PostSlice"; // Update the import path
import { Table, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./New.css";
import CustomModal from "../component/Modal";

const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users); // Update this line
  const status = useSelector((state) => state.users.status); // Update this line

  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleEditClick = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateUsers(editUser)); // Update this line
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteClick = (userId) => {
    try {
      dispatch(deleteUsers(userId));
      alert("User deleted successfully"); // Show alert
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: An error occurred while fetching data.</div>;
  }

  return (
    <div>
      <Container>
        <h2>Users</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="operation">
                  <Button variant="info" onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <CustomModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveChanges}
        editUser={editUser} // Update this line
        setEditUser={setEditUser} // Update this line
      />
    </div>
  );
};

export default DataTable;
