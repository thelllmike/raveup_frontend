import { useState } from "react";

import Dashboard from "./Dashboard";
import RacerManagement from "./RacerManagement";
import RaceManagement from "./RaceManagement";
import LeaderBoard from "./LeaderBoard";
import Finance from "./Finance";
import RacingDashboard from "./RacingDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <RacingDashboard />;
      case "racer":
        return <RacerManagement />;
      case "race":
        return <RaceManagement />;
      case "Leaderboard & Rankings":
        return <LeaderBoard />;
      case "Financial & Payments":
        return <Finance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow">
        <div className="container mx-auto flex overflow-x-auto">
          <a
            href="#"
            className={`px-6 py-4 font-medium flex items-center ${
              activeTab === "dashboard"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("dashboard");
            }}
          >
            <div className="mr-2">DASHBOARD</div>
          </a>
          <a
            href="#"
            className={`px-6 py-4 font-medium flex items-center ${
              activeTab === "racer"
                ? "text-[#E21518] border-b-2 border-[#E21518]"
                : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("racer");
            }}
          >
            <div className="mr-2">RACER</div>
          </a>
          <a
            href="#"
            className={`px-6 py-4 font-medium flex items-center ${
              activeTab === "race"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("race");
            }}
          >
            <div className="mr-2">RACE</div>
          </a>
          <a
            href="#"
            className={`px-6 py-4 font-medium flex items-center ${
              activeTab === "Leaderboard & Rankings"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Leaderboard & Rankings");
            }}
          >
            <div className="mr-2">Leaderboard & Rankings</div>
          </a>
          <a
            href="#"
            className={`px-6 py-4 font-medium flex items-center ${
              activeTab === "Financial & Payments"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Financial & Payments");
            }}
          >
            <div className="mr-2">Financial & Payments</div>
          </a>
        </div>
      </div>
      <div className="flex-grow bg-gray-50">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
