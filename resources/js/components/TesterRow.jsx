/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Save } from "react-feather";
import {
  Card,
  Table,
  Select,
  Textarea,
  Button,
  Modal,
  Label,
  ModalHeader,
  TableCell,
  TableRow,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const TesterRow = ({
  listPlan,
  listTesters,
  listResponsibles,
  elm,
  handleStatusUpdated,
  setMessage,
  setShow,
 
}) => {
  const [status, setStatus] = useState(elm.status);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [comment, setComment] = useState(elm.comments);
  const [description, setDescription] = useState("");
  const [showCreateAnomaly, setShowCreateAnomaly] = useState(false);

  const toggleDropdown = (taskId) => {
    setOpenDropdownId(openDropdownId === taskId ? null : taskId);
  };

  const handleCommentSubmit = async (id, comment) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/test_cases/${id}`,
      { comments: comment }
    );
    
    setOpenDropdownId(null);
    setShow(true);
    setTimeout(() => setShow(false), 5000);
    setMessage("commnet created successfully");
    console.log(response.data);
  };

  const handleCreateAnomaly = async (
    description,
    id_testCase,
    id_planTest,
    id_tester
  ) => {
    const anomalyData = { description, id_testCase, id_planTest, id_tester };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/anomalies",
      anomalyData
    );
    setShowCreateAnomaly(false);
    setShow(true);
    setTimeout(() => setShow(false), 5000);

    setMessage("anomaly created successfully");
    console.log("Anomaly created:", response.data);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/test_cases/${taskId}`,
      { status: newStatus }
    );
    if (response.status === 200) {
      elm.status = newStatus;
      setStatus(newStatus);
      handleStatusUpdated();
    } else {
      throw new Error("Failed to update status");
    }
  };

  return (
    < >
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
        <TableCell>
          <button
            onClick={() => toggleDropdown(elm.id)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            {openDropdownId === elm.id ? (
              <ArrowUp className="w-5 h-5" />
            ) : (
              <ArrowDown className="w-5 h-5" />
            )}
          </button>
        </TableCell>
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {listPlan.find((x) => x.id === elm.id_planTest)?.title || "Unknown"}
        </TableCell>
        <TableCell>{elm.title}</TableCell>
        <TableCell>
          {listTesters.find((x) => x.id === elm.id_tester)?.name || "Unknown"}
        </TableCell>
        <TableCell>
          {listResponsibles.find((x) => x.id === elm.id_responsible)?.name ||
            "Unknown"}
        </TableCell>
        <TableCell>{elm.created_at.split("T")[0]}</TableCell>
        <TableCell>
          <Select
            className="w-full"
            value={status}
            onChange={(e) => handleStatusChange(elm.id, e.target.value)}
          >
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
            <option value="to do">To Do</option>
          </Select>
        </TableCell>
      </TableRow>

      {openDropdownId === elm.id && (
        <TableRow className="bg-gray-50 dark:bg-gray-700">
          <TableCell colSpan={7}>
            <Card className="mb-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {elm.description}
                  </p>
                </div>

                <div>
                  <Label htmlFor={`comment-${elm.id}`} value="Add Comment" />
                  <Textarea
                    id={`comment-${elm.id}`}
                    className="mt-1"
                    placeholder="Write a comment..."
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    gradientMonochrome="success"
                    onClick={() => handleCommentSubmit(elm.id, comment)}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Comment
                  </Button>
                  <Button
                    gradientMonochrome="warning"
                    onClick={() => setShowCreateAnomaly(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Anomaly
                  </Button>
                </div>
              </div>
            </Card>
          </TableCell>
        </TableRow>
      )}

      <Modal
        show={showCreateAnomaly}
        onClose={() => setShowCreateAnomaly(false)}
      >
        <ModalHeader>Create Anomaly</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                id="description"
                className="mt-1"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the anomaly..."
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="gray"
            onClick={() => setShowCreateAnomaly(false)}
          >
            Close
          </Button>
          <Button
            gradientMonochrome="info"
            onClick={() =>
              handleCreateAnomaly(
                description,
                elm.id,
                elm.id_planTest,
                elm.id_tester
              )
            }
          >
            Save Anomaly
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TesterRow;