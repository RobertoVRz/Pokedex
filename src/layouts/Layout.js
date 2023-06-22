import React from "react";
import Image from "next/image";

function Layout() {
  return (
    <div className="navbar bg-red-600 flex flex-row">
      <h1 className="">Pokedex</h1>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
    </div>
  );
}

export default Layout;
