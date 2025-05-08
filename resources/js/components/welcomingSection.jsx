/* eslint-disable react/prop-types */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, Clock, User, Info, LogOut } from "react-feather";
import { Card, Button, Modal, ModalHeader, ModalBody } from "flowbite-react";

export default function WelcomingSection({ elm, listTesters, statusUpdated }) {
  const [showModal, setShowModal] = useState(false);
  const [countDone, setCountDone] = useState(0);
  const [countToDo, setCountToDo] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const obj = listTesters.find((res) => res.id === elm?.id_tester);
const [baseTime, setBaseTime] = useState(0); // Time from completed tasks (seconds)
  const [liveTime, setLiveTime] = useState(0); 

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    // const randomNumber = Math.floor(Math.random() * 12) + 1;
    return `/images/${randomNumber}.png`;
    // return `/images/${randomNumber}.JPEG`;
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/test_cases/tester/${elm?.id_tester}`)
      .then((response) => {
        const tasks = response.data;
        const done = tasks.filter((task) => task.status === "done");
        setCountDone(done.length);

        const todo = tasks.filter((task) => task.status === "to do");
        setCountToDo(todo.length);

        const inProgress = tasks.filter((task) => task.status === "in progress");
        setCountInProgress(inProgress.length);

const totalSeconds = done.reduce(
  (acc, curr) => acc + (curr.time_spent ? Number(curr.time_spent) : 0),
  0
);
setBaseTime(totalSeconds);
      })
      .catch((error) => console.log("Error fetching data", error));
  }, [elm?.id_tester, statusUpdated]);

useEffect(() => {
  const interval = setInterval(() => {
    setLiveTime(prev => prev + 60); 
  }, 60000); 

  return () => clearInterval(interval);
}, []);
const totalTime = baseTime + liveTime;

  return (
    <div className="p-6 bg-blue-50 rounded-2xl shadow-sm max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={getRandomImage()}
              alt="Tester Avatar"
              className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 shadow-md">
              <User className="text-white" size={16} />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-blue-600 rounded-full p-1 shadow-md">
            <a href="/">
              <LogOut className="text-white" size={16} />
            </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-800">
              Welcome back, {obj?.name}!
            </h2>
            <p className="text-blue-600 mt-1">
              Here's your testing dashboard overview
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-blue-800">{countDone}</p>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Calendar size={20} className="text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">To Do</p>
            <p className="text-2xl font-bold text-blue-800">{countToDo}</p>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Clock size={20} className="text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-blue-800">{countInProgress}</p>
          </Card>
        </div>

        {/* Time Spent & Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="bg-blue-50 px-4 py-3 rounded-lg w-full sm:w-auto">
            <p className="text-blue-800 text-center">
              <span className="font-semibold">Total time spent:</span> {formatTime(totalTime)} 
            </p>
          </div>
          
          <Button 
            gradientMonochrome="info"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Info size={16} />
            View Detailed Info
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <ModalHeader className="border-b border-blue-100">
          <div className="flex items-center gap-2 text-blue-800">
            <User size={20} />
            <span>Tester Details</span>
          </div>
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between border-b border-blue-50 pb-2">
              <span className="font-medium">Name:</span>
              <span>{obj?.name}</span>
            </div>
            <div className="flex justify-between border-b border-blue-50 pb-2">
              <span className="font-medium">Tasks Completed:</span>
              <span className="text-green-600">{countDone}</span>
            </div>
            <div className="flex justify-between border-b border-blue-50 pb-2">
              <span className="font-medium">Tasks To Do:</span>
              <span className="text-yellow-600">{countToDo}</span>
            </div>
            <div className="flex justify-between border-b border-blue-50 pb-2">
              <span className="font-medium">Tasks In Progress:</span>
              <span className="text-blue-600">{countInProgress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Time Spent:</span>
              <span className="font-bold">{formatTime(totalTime)} </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}




































// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// // /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Calendar, CheckCircle, Clock } from "react-feather";
// import { Card, Button, Modal, ModalHeader, ModalBody } from "flowbite-react";

// export default function WelcomingSection({ elm, listTesters, statusUpdated }) {
//   const [showModal, setShowModal] = useState(false);
//   const [countDone, setCountDone] = useState(0);
//   const [countToDo, setCountToDo] = useState(0);
//   const [countInProgress, setCountInProgress] = useState(0);
//   const [baseTime, setBaseTime] = useState(0); // Time from completed tasks (seconds)
//   const [liveTime, setLiveTime] = useState(0); // Live usage time (seconds)
//   const obj = listTesters.find((res) => res.id === elm?.id_tester);

//   // Format seconds to hours and minutes
//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     return `${hours}h ${minutes}m`;
//   };

//   // Fetch tasks and calculate time
//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/test_cases/tester/${elm?.id_tester}`)
//       .then((response) => {
//         const tasks = response.data;
//         const done = tasks.filter((task) => task.status === "done");
//         setCountDone(done.length);

//         const todo = tasks.filter((task) => task.status === "to do");
//         setCountToDo(todo.length);

//         const inProgress = tasks.filter((task) => task.status === "in progress");
//         setCountInProgress(inProgress.length);

//         const totalSeconds = done.reduce(
//           (acc, curr) => acc + (curr.time_spent ? Number(curr.time_spent) : 0),
//           0
//         );
//         setBaseTime(totalSeconds);
//       })
//       .catch((error) => console.log("Error fetching data", error));
//   }, [elm?.id_tester, statusUpdated]);

//   // Live time counter
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLiveTime(prev => prev + 60); // Add 60 seconds every minute
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   // Calculate total time in seconds
//   const totalTime = baseTime + liveTime;

//   return (
//     <div className="flex flex-col items-center justify-center px-4 py-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
//       <div className="flex flex-col items-center mb-6">
//         <img
//           src="/images/tester.jpeg"
//           alt="Tester Avatar"
//           className="w-24 h-24 rounded-full mb-3 shadow-md"
//         />
//         <h3 className="text-xl font-semibold text-gray-800">
//           Welcome back, <span className="text-blue-600">{obj?.name}</span>!
//         </h3>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
//         <Card className="items-center text-center">
//           <CheckCircle size={28} className="text-green-500 mb-1" />
//           <p className="text-sm text-gray-500">Tasks Completed</p>
//           <p className="text-lg font-bold text-gray-800">{countDone}</p>
//         </Card>
//         <Card className="items-center text-center">
//           <Calendar size={28} className="text-yellow-500 mb-1" />
//           <p className="text-sm text-gray-500">Tasks To Do</p>
//           <p className="text-lg font-bold text-gray-800">{countToDo}</p>
//         </Card>
//         <Card className="items-center text-center">
//           <Clock size={28} className="text-blue-500 mb-1" />
//           <p className="text-sm text-gray-500">In Progress</p>
//           <p className="text-lg font-bold text-gray-800">{countInProgress}</p>
//         </Card>
//       </div>

//       {/* Time Spent Card */}
//       <Card className="w-full mb-6">
//         <div className="text-center">
//           <p className="text-sm text-gray-500">Total Time Spent</p>
//           <p className="text-2xl font-bold text-blue-600">{formatTime(totalTime)}</p>
//           <p className="text-xs text-gray-400 mt-1">
//             (Includes completed tasks and active time)
//           </p>
//         </div>
//       </Card>

//       <Button color="blue" onClick={() => setShowModal(true)}>
//         See Info
//       </Button>

//       <Modal show={showModal} onClose={() => setShowModal(false)} popup>
//         <ModalHeader />
//         <ModalBody>
//           <div className="space-y-2 text-gray-800">
//             <h3 className="text-lg font-semibold text-center mb-4">Tester Info</h3>
//             <p>
//               <strong>Name:</strong> {obj?.name}
//             </p>
//             <p>
//               <strong>Tasks Done:</strong> {countDone}
//             </p>
//             <p>
//               <strong>Tasks to do:</strong> {countToDo}
//             </p>
//             <p>
//               <strong>In Progress:</strong> {countInProgress}
//             </p>
//             <p>
//               <strong>Task Time:</strong> {formatTime(baseTime)}
//             </p>
//             <p>
//               <strong>Active Time:</strong> {formatTime(liveTime)}
//             </p>
//             <p className="pt-2 border-t">
//               <strong>Total Time:</strong> {formatTime(totalTime)}
//             </p>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }