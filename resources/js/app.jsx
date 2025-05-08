import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom/client';  // Use ReactDOM for rendering
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./loginpage";
import { HomePage } from "./homePage";
import axios from "axios";
import { PlanTest } from "./planTest";
import Home from "./responsible/home";
import TableTestCases from "./responsible/tableTestCases";

// import Home from './components/Home';  // Your Home component
// import Login from '.Login';  // Your Login component

// This creates a root to render your React application

export const App = function () {
    // let [list,setList]=useState([]);
    let [tester, setTesters] = useState();
    let [planTest, setPlanTest] = useState();
    let [responsible, setResponsible] = useState();
    let [testCases, setTestCases] = useState();
    const [updatedPlanTest, setUpdatedPlanTest] = useState(false);

    const hundleUpdatedPlanTest = () => {
        setUpdatedPlanTest(!updatedPlanTest);
    };

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/testers")
            .then((resultat) => setTesters(resultat.data));
        axios
            .get("http://127.0.0.1:8000/api/responsibles")
            .then((resultat) => setResponsible(resultat.data));
        axios
            .get("http://127.0.0.1:8000/api/plan-tests")
            .then((resultat) => setPlanTest(resultat.data));
       
    }, []);


    useEffect(() => {
   
      axios
          .get("http://127.0.0.1:8000/api/test_cases")
          .then((resultat) => setTestCases(resultat.data));
  }, [updatedPlanTest]);

    // const root = ReactDOM.createRoot(document.getElementById('app'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/test_cases"
                    element={
                        <HomePage
                            listTesters={tester}
                            listResponsibles={responsible}
                            listPlan={planTest}
                        />
                    }
                />
                <Route path="/plan_test" element={<PlanTest />} />
                <Route
                    path="/responsibles"
                    element={
                        <Home
                            listTesters={tester}
                            listResponsibles={responsible}
                            listPlan={planTest}
                            listTestCases={testCases}
                            updatedPlanTest={updatedPlanTest}
                            hundleUpdatedPlanTest={hundleUpdatedPlanTest}
                        />
                    }
                />
                {/* <Route path="/home" element={<HomePage list={data}/>} />   */}
            </Routes>
        </Router>
    );
};
