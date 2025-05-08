import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom" 

export const PlanTest = function () {
    var [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/plan-tests').then((resultat)=>setData(resultat.data)).catch((error)=>console.log('error',error))
    },[])
    return (
        <>

<nav className="navbar">
  <div className="nav-left"><img src="images/logo3.png" style={{width:'150px'}}/></div>
  <div className="nav-right">
    <a href="https://www.airxelerate.com/"><img src="images/logo1.png" alt="logo1" style={{width:'100px'}}/></a>
    <a href="https://www.ax-lab.com/"><img src="images/logo2.png" alt="logo2" /></a>
  </div>
</nav>



        <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered align-middle text-center bg-white">
                <thead className="table-light">
                    <tr>
                        <th>Plan Test</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(function(elm){
                            return <tr>
                                <td ><Link to={`test_cases/${elm.title}`}>{elm.title}</Link></td>
                            </tr>
                        })

                    }
                    {/* <tr>
                        <td>
                            <Link to="/test_cases/regression">Regression</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/test_cases/smoke">Smoke</Link>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    </>)
}
