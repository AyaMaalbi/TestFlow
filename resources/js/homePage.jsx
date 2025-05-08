import React, { useEffect, useState } from "react";
import {
    User,
    Calendar,
    Repeat,
    Search,
    ArrowDown,
    ArrowUp,
} from "react-feather";
import axios from "axios";
import TesterRow from "./components/TesterRow";
import WelcomingSection from "./components/welcomingSection";
import { useSearchParams } from "react-router-dom";
import {
    Card,
    Select,
    Table,
    TableBody,
    TableHead,
    TableHeadCell,
    TextInput,
    Badge,
    TableRow,
    Alert,
} from "flowbite-react";

export const HomePage = function ({ listTesters, listResponsibles, listPlan }) {
    const [sortOption, setSortOption] = useState("dateDown");
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/test_cases")
            .then((result) => setData(result.data))
            .catch((error) => console.log("Error fetching data", error));
    }, []);

    const filteredData = data
        .filter((elm) =>
            elm.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((b, a) => {
            if (sortOption === "dateDown") {
                return new Date(a.created_at) - new Date(b.created_at);
            } else if (sortOption === "dateUp") {
                return b.created_at.localeCompare(a.created_at);
            }
            return 0;
        });

    const [searchParams] = useSearchParams();
    const obj = data.find(
        (res) => res.id_tester === Number(searchParams.get("id"))
    );

    const handleStatusUpdated = () => {
        setStatusUpdated(!statusUpdated);
    };

    // const handleShow = (show) => {
    //     setShow(!show);
    // };
    // const handleMessage = (message) => {
    //     setMessage(message);
    // };

    return (
        <div className="bg-blue-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Welcome Section */}
                <WelcomingSection
                    elm={obj}
                    listTesters={listTesters}
                    statusUpdated={statusUpdated}
                />

                {show && (
                    <Alert
                    
                        className="fixed bottom-5 right-5 z-[999]"
                        color="success"
                        onDismiss={() => alert("Alert dismissed!")}
                    >
                        {message}
                    </Alert>
                )}

                {/* Search and Filter Card */}
                <Card className="mb-6 border border-blue-100 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="w-full md:w-1/2">
                            <TextInput
                                icon={Search}
                                type="text"
                                placeholder="Search test cases..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select
                                icon={
                                    sortOption === "dateDown"
                                        ? ArrowDown
                                        : ArrowUp
                                }
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="w-full md:w-48"
                            >
                                {/* <option value="">unsorted</option> */}
                                <option value="dateDown">Recent</option>
                                <option value="dateUp">Oldest</option>
                            </Select>
                            <Badge color="blue" className="px-3 py-1.5">
                                {filteredData.length} Tests
                            </Badge>
                        </div>
                    </div>
                </Card>

                {/* Test Cases Table */}
                <Card className="border border-blue-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table hoverable className="min-w-full">
                            <TableHead className="bg-blue-50">
                                <TableRow>
                                    <TableHeadCell className="text-blue-800 font-medium w-16">
                                        #
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        <Calendar
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        Plan Test
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        Task Title
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        <User
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        Assigned To
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        <User
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        Assigned By
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        <Calendar
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        Date
                                    </TableHeadCell>
                                    <TableHeadCell className="text-blue-800 font-medium">
                                        Status
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y divide-blue-100">
                                {filteredData.map((elm, index) => (
                                    <TesterRow
                                        key={index}
                                        elm={elm}
                                        index={index}
                                        listPlan={listPlan}
                                        listTesters={listTesters}
                                        listResponsibles={listResponsibles}
                                        handleStatusUpdated={
                                            handleStatusUpdated
                                        }
                                        setShow={setShow}
                                        setMessage={setMessage}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
