import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <Link to="/">
                <h1>Year 4 Project</h1>
            </Link>
        </div>
    );
}