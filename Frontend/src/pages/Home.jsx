import React from "react";

const Home = () => {
  return (
    <div className="p-4 max-w-lg mx-auto mt-10 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold">Welcome to ARD System</h1>
      <div>
        <p>Please use the navigation menu to:</p>
        <ul>
          <li>View and manage Media Scans</li>
          <li>Track Cases</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
