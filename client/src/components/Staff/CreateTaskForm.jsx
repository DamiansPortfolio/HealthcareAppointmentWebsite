import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const CreateTaskForm = ({ fetchTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskMessage, setTaskMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCreateTask = async () => {
    try {
      const newTask = { task_name: taskName, task_message: taskMessage };
      await axios.post("/api/tasks", newTask);
      // Clear input fields after task creation
      setTaskName("");
      setTaskMessage("");
      // Fetch updated tasks after creation
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Create New Task
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task message"
                value={taskMessage}
                onChange={(e) => setTaskMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
