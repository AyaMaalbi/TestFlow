/* eslint-disable react/prop-types */
// import axios from "axios";
import {
    Badge,
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Popover,
    Select,
    TableCell,
    TableRow,
    Textarea,
    TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Edit2, PenTool, Trash2 } from "react-feather";
// import { Form } from "react-router-dom";
// import { ArrowDown, ArrowUp, Plus, Save } from "react-feather";

export const ResponsibleRow = ({
    listPlan,
    listTesters,
    listResponsibles,
    elm,
    hundleDelete,
    hundleUpdate,
    // hundlePlanTestUpdate,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState(elm.title);
    const [newStatus, setNewStatus] = useState(elm.status);
    const [newPlanTest, setNewPlanTest] = useState(elm.id_planTest);
    const [newResponsible, setNewResponsible] = useState(elm.id_responsible);
    const [newTester, setNewTester] = useState(elm.id_tester);
    const [newDescription, setNewDescription] = useState(elm.description);

    useEffect(() => {
        setNewTitle(elm.title);
        setNewStatus(elm.status);
        setNewPlanTest(elm.id_planTest);
        setNewResponsible(elm.id_responsible);
        setNewTester(elm.id_tester);
        setNewDescription(elm.description);
    }, [elm]);

    const sendDataToHundleUpdate = (
        newTitle,
        newDescription,
        newStatus,
        newPlanTest,
        newTester,
        newResponsible
    ) => {
        console.log("aaaaaaaaaaaa");

        const dataToUpdate = {
            title: newTitle,
            id_tester: newTester,
            id_responsible: newResponsible,
            id_planTest: newPlanTest,
            status: newStatus,
            // id_planTest: newPlanTest,
            // tester: newTester,
            // responsible: newResponsible,
            description: newDescription,
        };
        console.log("data in row ", dataToUpdate);
        hundleUpdate(elm.id, dataToUpdate);
        setShowModal(false);
    };
    let color;
    if (elm.status === "to do") {
        color = "red";
    } else if (elm.status === "in progress") {
        color = "yellow";
    } else if (elm.status === "done") {
        color = "green";
    }

    return (
        <React.Fragment key={elm.id}>
            <TableRow>
                <TableCell>
                    {listPlan.find((x) => x.id === elm.id_planTest)?.title ||
                        "Unknown"}
                </TableCell>
                {/* <TableCell></TableHead> */}
                <TableCell>
                    <Popover
                        trigger="click"
                        content={
                            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                                  description
                                </h3>
                              </div>
                              <div className="px-3 py-2">
                                <p>{elm.description}</p>
                              </div>
                            </div>
                          }
                    >
                        <div className="underline cursor-pointer">{elm.title}</div>
                    </Popover>
                </TableCell>
                {/* <TableCell>{elm.description}</TableCell> */}
                <TableCell>
                    {listTesters.find((x) => x.id === elm.id_tester)?.name ||
                        "Unknown"}
                </TableCell>
                <TableCell>
                    {listResponsibles.find((x) => x.id === elm.id_responsible)
                        ?.name || "Unknown"}
                </TableCell>
                <TableCell>{elm.created_at.split("T")[0]}</TableCell>
                <TableCell>
                    <Badge color={color}>{elm.status}</Badge>
                </TableCell>
                <TableCell>{elm.comments}</TableCell>
                <TableCell className="flex gap-2">
                    <Trash2
                        color="red"
                        size={16}
                        onClick={() => {
                            return (
                                confirm(`supprimer ${elm.title}`) &&
                                hundleDelete(elm?.id)
                            );
                        }}
                    />

                    <Edit2
                        size={16}
                        onClick={() => setShowModal(true)}
                        color="blue"
                    />
                </TableCell>
            </TableRow>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>Update {elm.title}</ModalHeader>
                <ModalBody>
                    <Label>Title</Label>
                    <TextInput
                        id="title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />

                    <Label>Status</Label>
                    <Select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="to do">to do</option>
                        <option value="in progress">in progress</option>
                        <option value="done">done</option>
                    </Select>

                    <Label>Plan Test</Label>
                    <Select
                        id="planTest"
                        value={newPlanTest}
                        onChange={(e) => setNewPlanTest(e.target.value)}
                    >
                        {listPlan.map((plan) => (
                            <option value={plan.id} key={plan.id}>
                                {plan.title}
                            </option>
                        ))}
                    </Select>

                    <Label>Tester</Label>
                    <Select
                        id="tester"
                        value={newTester}
                        onChange={(e) => setNewTester(e.target.value)}
                    >
                        {listTesters.map((tester) => (
                            <option value={tester.id} key={tester.id}>
                                {tester.name}
                            </option>
                        ))}
                    </Select>

                    <Label>Responsible</Label>
                    <Select
                        id="responsible"
                        value={newResponsible}
                        onChange={(e) => setNewResponsible(e.target.value)}
                    >
                        {listResponsibles.map((responsible) => (
                            <option value={responsible.id} key={responsible.id}>
                                {responsible.name}
                            </option>
                        ))}
                    </Select>

                    <Label>Description</Label>
                    <Textarea
                        id="description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button
                        onClick={() =>
                            sendDataToHundleUpdate(
                                newTitle,
                                newDescription,
                                newStatus,
                                Number(newPlanTest),
                                Number(newTester),
                                Number(newResponsible)
                            )
                        }
                    >
                        Save changes
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};
