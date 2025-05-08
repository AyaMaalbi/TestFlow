/* eslint-disable react/prop-types */
// import React, { useState } from "react";
// import { Plus } from "react-feather";
// import PlanTestRow from "./planTestRow";
// import {
//     Button,
//     TableBody,
//     TableHead,
//     TableHeadCell,
//     Table,
// } from "flowbite-react";

// export default function TablePlanTest({
//     hundleDeletePlanTest,
//     hundleUpdatePlanTest,
//     listPlanTest,
//     listResponsible,
//     setShowCreatePlan,
//     hundleUpdatedPlanTest,
// }) {
//     // const [searchTerm, setSearchTerm] = useState("");

//     // const filteredListPlanTest = listPlanTest.filter((elm) =>
//     //     elm.title.toLowerCase().includes(searchTerm.toLowerCase())
//     // );

//     return (
//         <div className="p-5 ">

//             {/* <div className="d-flex justify-content-end align-items-center mb-3">
//                 <label htmlFor="search" className="me-2 fw-semibold">
//                     Search:
//                 </label>
//                 <input
//                     type="search"
//                     id="search"
//                     className="form-control w-auto rounded-pill"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div> */}

//             <Table striped>
//                 <TableHead>
//                     <TableHeadCell>plan test</TableHeadCell>
//                     <TableHeadCell>responsible</TableHeadCell>
//                     {/* <TableHeadCell>Category</TableHeadCell> */}
//                     <TableHeadCell>created at</TableHeadCell>
//                     <TableHeadCell>action</TableHeadCell>
//                 </TableHead>

//                 <TableBody className="divide-y">
//                     {listPlanTest.map((elm) => (
//                         <PlanTestRow
//                             elm={elm}
//                             key={elm.id}
//                             listResponsible={listResponsible}
//                             hundleDeletePlanTest={hundleDeletePlanTest}
//                             hundleUpdatePlanTest={hundleUpdatePlanTest}
//                             hundleUpdatedPlanTest={hundleUpdatedPlanTest}
//                         />
//                     ))}
//                 </TableBody>
//             </Table>
//             <Button
//                 // className="btn btn-lg btn-outline-primary shadow-sm d-flex align-items-center"
//                 onClick={() => setShowCreatePlan(true)}
//                 className="rounded-full px-3 py-3 fixed bottom-3 right-3"
//             >
//                 <Plus className="" size={18} />

//             </Button>
//         </div>
//     );
// }

import React, { useState } from "react";
import { Plus, Calendar, User,  Search } from "react-feather";
import PlanTestRow from "./planTestRow";
import {
    Button,
    TableBody,
    TableHead,
    TableHeadCell,
    Table,
    TableRow,
    TextInput,
} from "flowbite-react";

export default function TablePlanTest({
    hundleDeletePlanTest,
    hundleUpdatePlanTest,
    listPlanTest,
    listResponsible,
    setShowCreatePlan,
    hundleUpdatedPlanTest,
}) {

const [searchTerm, setSearchTerm] = useState("");

const filteredData = listPlanTest.filter((elm) =>
    elm.title.toLowerCase().includes(searchTerm.toLowerCase())
);


    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-blue-100">
                    <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                        <Calendar className="mr-2" size={20} />
                        Test Plans
                    </h2>
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
                    
                    <Button
                        color="light"
                        onClick={() => setShowCreatePlan(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center"
                    >
                        <Plus className="mr-2" size={16} />
                        New Plan
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table hoverable className="min-w-full">
                        <TableHead className="bg-blue-50">
                            <TableRow>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    <Calendar
                                        size={16}
                                        className="inline mr-2"
                                    />
                                    Plan Test
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    <User size={16} className="inline mr-2" />
                                    Responsible
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    <Calendar
                                        size={16}
                                        className="inline mr-2"
                                    />
                                    Created At
                                </TableHeadCell>
                                <TableHeadCell className="text-blue-800 font-medium">
                                    Actions
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-blue-100">
                            {filteredData.map((elm) => (
                                <PlanTestRow
                                    key={elm.id}
                                    elm={elm}
                                    listResponsible={listResponsible}
                                    hundleDeletePlanTest={hundleDeletePlanTest}
                                    hundleUpdatePlanTest={hundleUpdatePlanTest}
                                    hundleUpdatedPlanTest={
                                        hundleUpdatedPlanTest
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Floating action button for mobile */}
            <Button
                onClick={() => setShowCreatePlan(true)}
                className="md:hidden fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
            >
                <Plus size={20} />
            </Button>
        </div>
    );
}
