/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
    Calendar,
    Plus,
    User,
    Edit2,
    Trash2,
    CheckCircle,
    Clock,
    AlertCircle,
    Search,
} from "react-feather";
import { ResponsibleRow } from "./responsibleRow";
import {
    TableBody,
    TableHead,
    TableHeadCell,
    TableRow,
    Table,
    Button,
    TextInput,
} from "flowbite-react";

export default function TableTestCases({
    data,
    listPlanTest,
    listTesters,
    listResponsibles,
    hundleDelete,
    hundleUpdate,
    hundlePlanTestUpdate,
    setShowCreateTest,
}) {
    const [filter, setFilter] = useState("");
    // const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = filter
        ? data
              .filter((item) => item.id_planTest === Number(filter))
              .filter((elm) =>
                  elm.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
        : data.filter((elm) =>
              elm.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="flex justify-between items-center gap-4 p-4 border-b border-blue-100">
                    <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                        <CheckCircle className="mr-2" size={20} />
                        Test Cases Management
                    </h2>

                    <div className="flex items-center gap-4">
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white border border-blue-300 rounded-lg px-4 py-2 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        >
                            <option value="">All</option>
                            {listPlanTest.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.title}
                                </option>
                            ))}
                        </select>

                        <div className="w-full">
                            <TextInput
                                icon={Search}
                                type="text"
                                placeholder="Search test cases..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <Button
                            color="light"
                            onClick={() => setShowCreateTest(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center"
                        >
                            <Plus className="mr-2" size={16} />
                            Add
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table hoverable className="min-w-full">
                        <TableHead className="bg-blue-50">
                            <TableRow>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    {/* <Calendar size={16} className="inline mr-2" /> */}
                                    Plan Test
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    Task Title
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    {/* <User size={16} className="inline mr-2" /> */}
                                    Assigned To
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    {/* <User size={16} className="inline mr-2" /> */}
                                    Assigned By
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    {/* <Calendar size={16} className="inline mr-2" /> */}
                                    Date
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    Status
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    Comments
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    Actions
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-blue-100">
                            {filteredData.map((elm, index) => (
                                <ResponsibleRow
                                    key={index}
                                    elm={elm}
                                    listPlan={listPlanTest}
                                    listTesters={listTesters}
                                    listResponsibles={listResponsibles}
                                    hundleDelete={hundleDelete}
                                    hundleUpdate={hundleUpdate}
                                    hundlePlanTestUpdate={hundlePlanTestUpdate}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Floating action button for mobile */}
            <Button
                onClick={() => setShowCreateTest(true)}
                className="md:hidden fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
            >
                <Plus size={20} />
            </Button>
        </div>
    );
}
