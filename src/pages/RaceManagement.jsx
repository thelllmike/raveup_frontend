// src/RaceManagement.jsx
import { useState, useEffect } from "react";
import ApiService from "../ApiService";

// Categories for dropdown
const categories = ["1000CC", "600CC", "ENDURANCE", "RALLY", "SPRINT"];

export default function RaceManagement() {
  const [races, setRaces] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [newRace, setNewRace] = useState({
    name: "",
    location: "",
    date: "",
    category: "",
    maxParticipants: "",
  });

  // Fetch all races on mount
  useEffect(() => {
    loadRaces();
  }, []);

  const loadRaces = async () => {
    try {
      const data = await ApiService.getAllRaces();
      // Map API response to UI shape
      const formatted = data.map((r) => ({
        id: r.id,
        name: r.race_name,
        date: r.date,
        location: r.location,
        category: r.category,
        registrations: r.registrations || 0,
        status: r.status || "UPCOMING",
        maxParticipants: r.max_participants,
        participants: r.participants || [],
      }));
      setRaces(formatted);
    } catch (err) {
      console.error("Failed to load races:", err);
    }
  };

  // Handle creating a new race
  const handleCreateRace = async () => {
    try {
      await ApiService.createRace({
        race_name: newRace.name,
        location: newRace.location,
        date: newRace.date,
        category: newRace.category,
        max_participants: parseInt(newRace.maxParticipants, 10),
      });
      setActiveModal(null);
      setNewRace({ name: "", location: "", date: "", category: "", maxParticipants: "" });
      loadRaces();
    } catch (err) {
      console.error("Failed to create race:", err);
    }
  };

  // Handle input changes for new race form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRace((prev) => ({ ...prev, [name]: value }));
  };

  // Handle viewing race details
  const handleViewRace = (race) => {
    setSelectedRace(race);
    setActiveModal("RACE_DETAILS");
  };

  // Handle approving a participant
  const handleApproveParticipant = (racerName) => {
    if (!selectedRace) return;
    const updatedParticipants = selectedRace.participants.map((p) =>
      p.name === racerName ? { ...p, status: "APPROVED" } : p
    );
    const updatedRace = { ...selectedRace, participants: updatedParticipants };
    setSelectedRace(updatedRace);
    setRaces((prev) =>
      prev.map((r) => (r.id === updatedRace.id ? updatedRace : r))
    );
  };

  // Handle closing a race
  const handleCloseRace = (raceId) => {
    setRaces((prev) =>
      prev.map((r) =>
        r.id === raceId ? { ...r, status: "COMPLETED" } : r
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="SEARCH BY RACE NAME OR LOCATION"
                className="w-full pl-4 pr-10 py-3 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-red-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-white bg-red-600 rounded-r-lg">
                {/* search icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button className="p-3 border rounded-lg">
              {/* calendar icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-3 border rounded-lg">
              {/* menu icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Events Header */}
        <div className="mb-6">
          <h2 className="header-title">RECENT EVENTS</h2>
        </div>

        {/* Create New Race Button */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center"
            onClick={() => setActiveModal("CREATE_RACE")}
          >
            {/* plus icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            CREATE NEW RACE
          </button>
        </div>

        {/* Race Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <div key={race.id} className="bg-white rounded-lg shadow overflow-hidden p-2">
              {/* Status Bar */}
              <div className={`w-full py-2 text-center rounded-t-lg border-1 ${
                race.status === "COMPLETED"
                  ? "border-green-500"
                  : race.status === "ONGOING"
                  ? "border-yellow-500"
                  : "border-blue-500"
              } text-white`}>
                <span className={`font-medium ${
                  race.status === "COMPLETED"
                    ? "text-green-400"
                    : race.status === "ONGOING"
                    ? "text-yellow-400"
                    : "text-blue-400"
                }`}>
                  {race.status === "COMPLETED"
                    ? "● COMPLETED"
                    : race.status === "ONGOING"
                    ? "● ONGOING"
                    : "● UPCOMING"}
                </span>
              </div>

              <div className="p-4">
                {/* Race Title */}
                <h3 className="text-xl font-bold mb-4">
                  {race.name} - #{race.id}
                </h3>

                {/* Race Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">DATE</p>
                    <p className="font-bold">{race.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">LOCATION</p>
                    <p className="font-bold">{race.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">CATEGORY</p>
                    <p className="font-bold">{race.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">REGISTRATIONS</p>
                    <p className="font-bold">{race.maxParticipants}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 border border-red-600 text-red-600 rounded-full py-2"
                    onClick={() => handleViewRace(race)}
                  >
                    VIEW
                  </button>

                  {race.status === "COMPLETED" ? (
                    <button className="flex-1 bg-red-600 text-white rounded-full py-2">
                      RESULTS
                    </button>
                  ) : race.status === "ONGOING" ? (
                    <button
                      className="flex-1 bg-red-600 text-white rounded-full py-2"
                      onClick={() => handleCloseRace(race.id)}
                    >
                      CLOSE RACE
                    </button>
                  ) : (
                    <button className="flex-1 bg-red-600 text-white rounded-full py-2">
                      EDIT
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Race Details Modal */}
      {activeModal === "RACE_DETAILS" && selectedRace && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">RACE DETAILS</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setActiveModal(null)}>
                {/* close icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">
                {selectedRace.name} - #{selectedRace.id}
              </h2>

              {/* Race Overview */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">DATE</p>
                  <p className="font-bold">{selectedRace.date}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">CATEGORY</p>
                  <p className="font-bold">{selectedRace.category}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">LOCATION</p>
                  <p className="font-bold">{selectedRace.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">MAX PARTICIPANTS</p>
                  <p className="font-bold">{selectedRace.maxParticipants}</p>
                </div>
              </div>

              {/* Participants Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-3 px-4 text-left">RACER NAME</th>
                      <th className="py-3 px-4 text-left">CATEGORY</th>
                      <th className="py-3 px-4 text-left">TEAM</th>
                      <th className="py-3 px-4 text-left">STATUS</th>
                      <th className="py-3 px-4 text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRace.participants.map((participant, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-3 px-4">{participant.name}</td>
                        <td className="py-3 px-4">{participant.category}</td>
                        <td className="py-3 px-4">{participant.team}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                            participant.status === "APPROVED"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {participant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {participant.status === "APPROVED" ? (
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full">
                              VIEW PROFILE
                            </button>
                          ) : (
                            <button
                              className="bg-red-600 text-white px-4 py-2 rounded-full"
                              onClick={() => handleApproveParticipant(participant.name)}
                            >
                              APPROVE
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-red-600 text-white px-6 py-2 rounded-full">
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Race Modal */}
      {activeModal === "CREATE_RACE" && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">CREATE NEW RACE</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setActiveModal(null)}>
                {/* close icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="RACE NAME"
                    className="w-full p-3 bg-gray-100 rounded-lg"
                    value={newRace.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="location"
                    placeholder="LOCATION"
                    className="w-full p-3 bg-gray-100 rounded-lg"
                    value={newRace.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 bg-gray-100 rounded-lg pr-10"
                    value={newRace.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <select
                    name="category"
                    className="w-full p-3 bg-gray-100 rounded-lg appearance-none"
                    value={newRace.category}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>CATEGORY</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <input
                    type="number"
                    name="maxParticipants"
                    placeholder="MAX PARTICIPANTS"
                    className="w-full p-3 bg-gray-100 rounded-lg"
                    value={newRace.maxParticipants}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button className="border border-red-600 text-red-600 px-6 py-2 rounded-full" onClick={() => setActiveModal(null)}>
                  CANCEL
                </button>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-full"
                  onClick={handleCreateRace}
                  disabled={
                    !newRace.name ||
                    !newRace.location ||
                    !newRace.date ||
                    !newRace.category ||
                    !newRace.maxParticipants
                  }
                >
                  CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
