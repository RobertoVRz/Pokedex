import React from "react";

function Navbar() {
  return (
    <div className="navbar bg-red-500 fixed z-20">
      <div className="navbar-start">
        <ul
          tabIndex={0}
          className="menu menu-sm mt-3 z-[1] p-2 rounded-box w-52"
        >
          <li>
            <a href={`/`}>Home</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
