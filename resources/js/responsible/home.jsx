/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";

// import TesterRow from "../components/TesterRow";
import axios from "axios";
import { Calendar, Plus, User } from "react-feather";
import { ResponsibleRow } from "./responsibleRow";
import PlanTestRow from "./planTestRow";
// import UserTesterRow from "./userTesterRow";
import TableTestCases from "./tableTestCases";
import TablePlanTest from "./tablePlanTest";
// import TableTesters from "./tableTesters";
// import ResponsibleSideBar from "./responsibleSideBar";
import { Route, Router, Routes } from "react-router-dom";
import {
    Alert,
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import ResponsibleSideBar from "./responsibleSideBar";
// import { ModuleGraph } from "vite";
// import { Alert } from "react-bootstrap";

export default function Home({
    listTesters,
    listResponsibles,
    listPlan,
    listTestCases,
    updatedPlanTest,
    hundleUpdatedPlanTest,
}) {
    const [data, setData] = useState(listTestCases);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const [showCreateTest, setShowCreateTest] = useState(false);
    const [showCreatePlan, setShowCreatePlan] = useState(false);
    const [responsible, setResponsible] = useState(listResponsibles[0]?.id);
    const [tester, setTester] = useState(listTesters[0]?.id);
    const [planTest, setPlanTest] = useState(listPlan[0]?.id);
    const [description, setDescription] = useState("");
    const [comment, setComment] = useState("");
    const [responsiblePlan, setResponsiblePlan] = useState(
        listResponsibles[0]?.id
    );
    const [titlePlan, setTitlePlan] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("to do");
    const [listPlanTest, setListPlan] = useState(listPlan);
    console.log("listPlanTest in props", listPlanTest);
    const [listTester, setListTester] = useState(listTesters);
    const [showTester, setShowTester] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [activeTable, setActiveTable] = useState("testCases");

    // const [listTestCase, setListTestCase] = useState(data);

    // const [k, setK] = useState(false);
    const [planTestUpdated, setPlanTestUpdated] = useState(false);

    // useEffect(() => {
    //     axios
    //         .get("http://127.0.0.1:8000/api/test_cases")
    //         .then((result) => setData(result.data))
    //         .catch((error) => console.log("Error fetching data", error));
    // }, []);

    const hundlePlanTestUpdate = () => {
        setPlanTestUpdated(!planTestUpdated);
    };

    useEffect(() => {
        setData(listTestCases);
    }, [listTestCases]);

    const createTestCase = async (testCaseData) => {
        console.log("testCaseData", testCaseData);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/test_cases/create",
                testCaseData
            );
            if (response.status === 200) {
                console.log("Test case created:", response.data.testCase);
                setData((prevData) => [...prevData, response.data.testCase]);
                setMessage("Test case created successfully");
                setShowCreateTest(false);
                setShow(true);
                setTimeout(() => setShow(false), 4000);
            }
        } catch (error) {
            console.error("Error creating test case:", error);
            setMessage("Failed to create test case");
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    console.log("========data in home", data);

    const createTester = async (testerData) => {
        console.log("testerData", testerData);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/testers/create",
                testerData
            );
            if (response.status === 200) {
                console.log("Tester created:", response.data.tester);
                setListTester((prevListTester) => [
                    ...prevListTester,
                    response.data.tester,
                ]);
                setMessage("Tester created successfully");
                setShowCreateTest(false);
                setShow(true);
                setTimeout(() => setShow(false), 4000);
            }
        } catch (error) {
            console.error("Error creating tester:", error);
            setMessage("Failed to create tester");
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    //update tester

    const updateTester = async (id, updatedTester) => {
        console.log("updatedTester", updatedTester);

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/testers/update/${id}`,
                updatedTester
            );
            if (response.status === 200) {
                console.log("response after update", response);
                setListTester(
                    listTester.map((elm) =>
                        elm.id === response.data.tester.id
                            ? response.data.tester
                            : elm
                    )
                );
                setMessage("Tester updated successfully");
                setShow(true);
                setTimeout(() => setShow(false), 3000);
            }
        } catch (error) {
            console.error("Error updating tester:", error);
            setMessage("Failed to update tester");
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const createPlanTest = async (planTest) => {
        console.log("planTest", planTest);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/plan-tests/create",
                planTest
            );
            console.log("response", response);
            if (response.status === 200) {
                console.log("Plan test created:", response.data.planTest);
                setListPlan((prevListPlan) => [
                    ...prevListPlan,
                    response.data.planTest,
                ]);
                console.log("listPlan", listPlanTest);

                setShowCreatePlan(false);

                setMessage("Plan test created successfully");
                setShow(true);

                setTimeout(() => setShow(false), 5000);
            }
        } catch (error) {
            console.error("Error creating plan test:", error);
            setMessage("Failed to create plan test");
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const hundleDeletePlanTest = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/plan-tests/delete/${id}`
            );

            if (response.status === 200) {
                console.log("Plan test deleted:", response.data.planTest);
                setListPlan((prevListPlan) =>
                    prevListPlan.filter(
                        (elm) => elm.id !== response.data.planTest?.id
                    )
                );
                setMessage("Plan test deleted successfully");
                setShow(true);
                setTimeout(() => setShow(false), 3000);
            }
        } catch (error) {
            console.error("Error deleting plan test:", error);
            setMessage("Failed to delete plan test");
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const hundleDelete = async (id) => {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/test-cases/delete/${id}`
        );

        if (response.status === 200) {
            console.log(response.data.testCase);
            setData(
                data.filter((elm) => elm.id !== response.data.testCase?.id)
            );
            setMessage(response.data.message);
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const hundleUpdate = async (id, updated) => {
        console.log("updated", updated);
        console.log("id", id);
        const response = await axios.put(
            `http://127.0.0.1:8000/api/test_cases/${id}`,

            updated
        );

        if (response.status === 200) {
            console.log("response in home", response);
            setData(
                data.map((elm) => {
                    if (elm.id === response.data.testCase?.id) {
                        return {
                            ...elm,
                            title: response.data.testCase?.title,
                            description: response.data.testCase?.description,
                            status: response.data.testCase?.status,
                            id_planTest: response.data.testCase?.id_planTest,
                            id_responsible:
                                response.data.testCase?.id_responsible,
                            id_tester: response.data.testCase?.id_tester,
                            // comments: response.data.testCase?.comments,
                            // date: response.data.testCase?.date,
                            // created_at: response.data.testCase?.created_at,
                            // updated_at: response.data.testCase?.updated_at,
                        };
                    }
                    return elm;
                })
            );
            setMessage(response.data.message);
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const hundleDeleteTester = async (id) => {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/testers/delete/${id}`
        );

        if (response.status === 200) {
            console.log("responseTester", response);
            setData(data.filter((elm) => elm.id !== response.data.tester?.id));
            setMessage(response.data.message);
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    };

    const hundleUpdatePlanTest = async (id, updated) => {
        const response = await axios.put(
            `http://127.0.0.1:8000/api/plan-tests/${id}`,
            updated
        );

        if (response.status === 200) {
            console.log("response in home", response);

            setListPlan((prevListPlan) =>
                prevListPlan.map((elm) => {
                    if (elm.id === response.data.planTest?.id) {
                        return {
                            ...elm,
                            title: response.data.planTest?.title ?? elm.title,
                            id_responsible: Number(
                                response.data.planTest?.id_responsible
                            ),
                        };
                    }
                    return elm;
                })
            );
            setMessage(response.data.message);
            setShow(true);
            setTimeout(() => setShow(false), 5000);
        }
    };

    const hundleActiveTable = (activeTable) => {
        setActiveTable(activeTable);
    };

    return (
        <div>
            {/* <NavBar /> */}
            <div className="flex flex-row">
                <ResponsibleSideBar hundleActiveTable={hundleActiveTable} />
                <div className="pl-64 w-full">
                    {show && (
                        <Alert
                        className="fixed bottom-5 right-5 z-[999]"
                            color="success"
                            onDismiss={() => alert("Alert dismissed!")}
                        >
                            {message}
                        </Alert>
                    )}

                    <Modal
                        show={showCreateTest}
                        size="md"
                        onClose={() => setShowCreateTest(false)}
                        popup
                    >
                        <ModalHeader>
                        Create new test case
                        </ModalHeader >
                        <ModalBody>
                            
                                
                              
                           
                            <div className="modal-body">
                                <>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="small">title</Label>
                                        </div>
                                        <TextInput
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            type="text"
                                            sizing="sm"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="large">
                                                description
                                            </Label>
                                        </div>
                                        <Textarea
                                           
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-2 block">
                                        <Label htmlFor="plan_test">
                                            plan test
                                        </Label>
                                    </div>
                                    <Select
                                        id="countries"
                                        required
                                        onChange={(e) =>
                                            setPlanTest(e.target.value)
                                        }
                                    >
                                        {listPlanTest.map((plan) => (
                                            <option
                                                key={plan.id}
                                                value={plan.id}
                                            >
                                                {plan.title}
                                            </option>
                                        ))}
                                    </Select>

                                    <div className="mb-2 block">
                                        <Label htmlFor="tester">tester</Label>
                                    </div>
                                    <Select
                                        id="countries"
                                        required
                                        onChange={(e) => {
                                            setTester(e.target.value);
                                        }}
                                    >
                                        {listTesters.map((tester) => (
                                            <option
                                                key={tester.id}
                                                value={tester.id}
                                            >
                                                {tester.name}
                                            </option>
                                        ))}
                                    </Select>

                                    <div className="mb-2 block">
                                        <Label htmlFor="tester">
                                            responsible
                                        </Label>
                                    </div>
                                    <Select
                                        id="countries"
                                        required
                                        onChange={(e) => {
                                            setResponsible(e.target.value);
                                        }}
                                    >
                                        {listResponsibles.map((responsible) => (
                                            <option
                                                key={responsible.id}
                                                value={responsible.id}
                                            >
                                                {responsible.name}
                                            </option>
                                        ))}
                                    </Select>
                                </>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    const obj = {
                                        title: title,
                                        description: description,
                                        comments: comment,
                                        status: status,
                                        id_planTest: Number(planTest),
                                        id_tester: Number(tester),
                                        id_responsible: Number(responsible),
                                    };
                                    createTestCase(obj);
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowCreatePlan(false)}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal
                        show={showCreatePlan}
                        size="md"
                        onClose={() => setShowCreatePlan(false)}
                        popup
                    >
                        <ModalHeader>
                        Create new plan test
                        </ModalHeader >
                        <ModalBody>
                            
                            <div className="modal-body">
                                <>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="small">title</Label>
                                        </div>
                                        <TextInput
                                            onChange={(e) =>
                                                setTitlePlan(e.target.value)
                                            }
                                            type="text"
                                            sizing="sm"
                                        />
                                    </div>

                                    

                                    
                                 

                                    <div className="mb-2 block">
                                        <Label htmlFor="tester">
                                            responsible
                                        </Label>
                                    </div>
                                    <Select
                                        id="countries"
                                        required
                                        onChange={(e) => {
                                            setResponsible(e.target.value);
                                        }}
                                    >
                                        {listResponsibles.map((responsible) => (
                                            <option
                                                key={responsible.id}
                                                value={responsible.id}
                                            >
                                                {responsible.name}
                                            </option>
                                        ))}
                                    </Select>
                                </>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="btn btn-primary"
                                onClick={() => {
                                    const obj = {
                                        title: titlePlan,
                                        id_responsible: Number(responsiblePlan),
                                    };

                                    createPlanTest(obj);
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowCreatePlan(false)}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                    {activeTable === "testCases" && (
                        <TableTestCases
                            data={data}
                            listPlanTest={listPlanTest}
                            listTesters={listTesters}
                            listResponsibles={listResponsibles}
                            hundleDelete={hundleDelete}
                            hundleUpdate={hundleUpdate}
                            hundlePlanTestUpdate={hundlePlanTestUpdate}
                            setShowCreateTest={setShowCreateTest}
                        />
                    )}

                    {activeTable === "planTest" && (
                        <TablePlanTest
                            hundleDeletePlanTest={hundleDeletePlanTest}
                            hundleUpdatePlanTest={hundleUpdatePlanTest}
                            listPlanTest={listPlanTest}
                            listResponsible={listResponsibles}
                            setShowCreatePlan={setShowCreatePlan}
                            hundlePlanTestUpdate={hundlePlanTestUpdate}
                            hundleUpdatedPlanTest={hundleUpdatedPlanTest}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
