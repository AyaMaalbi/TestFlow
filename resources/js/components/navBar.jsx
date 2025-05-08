import React from "react";

export default function NavBar() {
    return (
       
        <nav className="navbar">
            <div className="nav-left">
                <img src="images/logo3.png" style={{ width: "150px" }} />
            </div>
            <div className="nav-right">
                <a href="https://www.airxelerate.com/">
                    <img
                        src="images/logo1.png"
                        alt="logo1"
                        style={{ width: "100px" }}
                    />
                </a>
                <a href="https://www.ax-lab.com/">
                    <img src="images/logo2.png" alt="logo2" />
                </a>
            </div>
        </nav>
    );
}
