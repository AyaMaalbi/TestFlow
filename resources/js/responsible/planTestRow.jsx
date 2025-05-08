/* eslint-disable react/prop-types */
import {
    Button,
    
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Select,
    TableCell,
    TableRow,
    TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Edit2  , Trash2 } from "react-feather";

export default function PlanTestRow({
    elm,
    listResponsible,
    hundleDeletePlanTest,
    hundleUpdatePlanTest,
    hundleUpdatedPlanTest,
}) {
    const [showUpdate, setShowUpdate] = useState(false);
    const [newTitle, setNewTitle] = useState(elm.title);
    const [newResponsible, setNewResponsible] = useState(elm.id_responsible);

    const [element, setElement] = useState(elm);
    useEffect(() => {
        setElement(elm);
        setNewTitle(elm.title);
        setNewResponsible(elm.id_responsible);
    }, [elm]);

    function hundleDelete(id) {
        hundleDeletePlanTest(id);
        hundleUpdatedPlanTest();
    }
    function hundleUpdate(newTitle, newResponsible) {
        hundleUpdatedPlanTest();
        const obj = {
            title: newTitle,
            id_responsible: Number(newResponsible),
        };
        console.log("obj in olan test row", obj);

        hundleUpdatePlanTest(element.id, obj);
    }

    return (
        <React.Fragment key={element.id}>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {element.title}
                </TableCell>

                <TableCell>
                    {
                        listResponsible.find((x) => x.id === element.id_responsible)
                            .name
                    }
                </TableCell>
                <TableCell>{element.created_at.split("T")[0]}</TableCell>
                <TableCell className="flex gap-2">
                    <Trash2
                        size={16}
                        color="red"
                        onClick={() => {
                            if (
                                confirm(
                                    "are u sure deleting plan test will delete all the test cases?"
                                )
                            ) {
                                hundleDelete(element.id);
                            }
                        }}
                    />

                    <Edit2
                        size={16}
                        onClick={() => setShowUpdate(true)}
                        color="blue"
                    />
                </TableCell>
            </TableRow>
            



                <Modal show={showUpdate} onClose={() => setShowUpdate(false)}>
                    <ModalHeader>Edit Plan Test</ModalHeader>
                    <ModalBody>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <TextInput
                                    id="title"
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="responsible">Responsible</Label>
                                <Select
                                    id="responsible"
                                    value={newResponsible}
                                    onChange={(e) =>
                                        setNewResponsible(e.target.value)
                                    }
                                >
                                    {listResponsible.map((responsible) => (
                                        <option
                                            key={responsible.id}
                                            value={responsible.id}
                                        >
                                            {responsible.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="gray"
                            onClick={() => setShowUpdate(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            
                            onClick={() => {
                                hundleUpdate(newTitle, newResponsible);
                                setShowUpdate(false);
                            }}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
           
        </React.Fragment>
    );
}
