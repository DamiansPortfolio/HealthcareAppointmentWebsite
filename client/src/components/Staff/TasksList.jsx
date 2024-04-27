import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";

const TasksList = ({ tasks, handleMarkAsComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleMarkComplete = (taskId) => {
    handleMarkAsComplete(taskId);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task_name}</td>
              <td>{task.task_message}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleMarkComplete(task.id)}
                >
                  Mark as Complete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </>
  );
};

export default TasksList;
